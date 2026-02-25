/**
 * メタルビア・ソリッド — ゲームウォッチ風ステルスアクション
 *
 * ビール屋のバイトが店長の目を盗んで「銀色に輝くビール（メタルビア）」をこっそり飲みまくるゲーム
 */

import { useLocation } from "wouter";
import { useRef, useEffect, useCallback, useState } from "react";

// ── 定数 ──
const CANVAS_W = 400;
const CANVAS_H = 560;
const FPS = 12; // ゲームウォッチ風の低フレームレート

const POSITIONS = [0, 1, 2] as const; // 左・中央・右
type Pos = 0 | 1 | 2;

const LCD_BG = "#9ead86";       // LCD緑背景
const LCD_DARK = "#1a2010";     // LCD濃いドット
const LCD_GHOST = "rgba(26,32,16,0.08)"; // ゴースト残像
const LCD_ACCENT = "#c0c0c0";   // メタルビア銀色

// 店長の向き
type BossDir = "left" | "right" | "turning";

// ゲーム状態
type GameState = "title" | "playing" | "gameover";

// ── メインコンポーネント ──
export default function Games() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameData | null>(null);
  const animFrameRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const [, setTick] = useState(0); // 再描画トリガー

  // ゲームデータ
  interface GameData {
    state: GameState;
    score: number;
    highScore: number;
    lives: number;
    playerPos: Pos;
    isDrinking: boolean;
    drinkTimer: number;      // 飲みモーション残りフレーム
    drinkPos: Pos;           // 飲み始めた位置
    bossPos: number;         // 0-2 の連続値（補間用）
    bossDir: BossDir;
    bossLookDir: "left" | "right"; // 店長の視線方向
    bossTurnTimer: number;
    bossSpeed: number;
    bossPattern: number;     // 行動パターンカウンタ
    level: number;
    combo: number;
    beers: boolean[];        // 各ポジションにビールがあるか
    metalBeer: number;       // メタルビア位置 (-1=なし)
    drunkGauge: number;      // 酔いゲージ 0-100
    missFlash: number;       // ミス演出フレーム
    safeFlash: number;       // ギリギリセーフ演出
    bonusText: string;
    bonusTimer: number;
    frameCount: number;
    beerRespawnTimers: number[]; // ビール復活タイマー
  }

  const initGame = useCallback((): GameData => {
    return {
      state: "title",
      score: 0,
      highScore: gameRef.current?.highScore ?? 0,
      lives: 3,
      playerPos: 1,
      isDrinking: false,
      drinkTimer: 0,
      drinkPos: 1,
      bossPos: 2,
      bossDir: "left",
      bossLookDir: "right",
      bossTurnTimer: 0,
      bossSpeed: 0.02,
      bossPattern: 0,
      level: 1,
      combo: 0,
      beers: [true, true, true],
      metalBeer: -1,
      drunkGauge: 0,
      missFlash: 0,
      safeFlash: 0,
      bonusText: "",
      bonusTimer: 0,
      frameCount: 0,
      beerRespawnTimers: [0, 0, 0],
    };
  }, []);

  // ── 店長AI ──
  const updateBoss = (g: GameData) => {
    g.bossPattern++;

    // レベルに応じたパターン
    const turnChance = Math.min(0.02 + g.level * 0.008, 0.08);
    const speed = Math.min(0.015 + g.level * 0.005, 0.06);

    if (g.bossTurnTimer > 0) {
      g.bossTurnTimer--;
      if (g.bossTurnTimer === 0) {
        // 振り返り完了 → 視線を反転
        g.bossLookDir = g.bossLookDir === "left" ? "right" : "left";
        g.bossDir = g.bossLookDir === "left" ? "left" : "right";
      }
      return;
    }

    // ランダム振り返り
    if (g.level >= 2 && Math.random() < turnChance) {
      g.bossTurnTimer = g.level >= 3 ? 3 : 5; // Lv3+でフェイント（早い）
      g.bossDir = "turning";
      return;
    }

    // 左右移動
    if (g.bossDir === "left") {
      g.bossPos -= speed;
      if (g.bossPos <= 0) {
        g.bossPos = 0;
        g.bossDir = "right";
        g.bossLookDir = "right";
      }
    } else {
      g.bossPos += speed;
      if (g.bossPos >= 2) {
        g.bossPos = 2;
        g.bossDir = "left";
        g.bossLookDir = "left";
      }
    }
  };

  // ── 判定 ──
  const checkCaught = (g: GameData): boolean => {
    if (!g.isDrinking) return false;
    // 店長がプレイヤー方向を見ているか
    const bossDiscrete = Math.round(g.bossPos) as Pos;
    if (g.bossDir === "turning") return false; // 振り返り中は見えない

    // 視線方向にプレイヤーがいるか
    if (g.bossLookDir === "left" && g.drinkPos <= bossDiscrete) return true;
    if (g.bossLookDir === "right" && g.drinkPos >= bossDiscrete) return true;
    return false;
  };

  // ── ビール復活 ──
  const updateBeers = (g: GameData) => {
    for (let i = 0; i < 3; i++) {
      if (!g.beers[i]) {
        g.beerRespawnTimers[i]++;
        if (g.beerRespawnTimers[i] >= FPS * 3) { // 3秒で復活
          g.beers[i] = true;
          g.beerRespawnTimers[i] = 0;
        }
      }
    }
    // メタルビア出現（低確率）
    if (g.metalBeer === -1 && g.frameCount % (FPS * 10) === 0 && Math.random() < 0.3) {
      const emptyPositions = POSITIONS.filter(p => g.beers[p]);
      if (emptyPositions.length > 0) {
        g.metalBeer = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
      }
    }
  };

  // ── 酔いゲージ ──
  const updateDrunk = (g: GameData) => {
    if (!g.isDrinking && g.drunkGauge > 0) {
      g.drunkGauge = Math.max(0, g.drunkGauge - 0.15);
    }
    // 酔いMAXで強制発覚
    if (g.drunkGauge >= 100) {
      g.drunkGauge = 80;
      triggerMiss(g, true);
    }
  };

  // ── ミス処理 ──
  const triggerMiss = (g: GameData, drunk = false) => {
    g.lives--;
    g.combo = 0;
    g.isDrinking = false;
    g.drinkTimer = 0;
    g.missFlash = FPS; // 1秒間フラッシュ
    g.bonusText = drunk ? "DRUNK!" : "CAUGHT!";
    g.bonusTimer = FPS;
    if (g.lives <= 0) {
      g.state = "gameover";
      if (g.score > g.highScore) g.highScore = g.score;
    }
  };

  // ── メインループ ──
  const update = useCallback((g: GameData) => {
    if (g.state !== "playing") return;
    g.frameCount++;

    // レベル更新
    g.level = Math.min(Math.floor(g.score / 500) + 1, 10);

    updateBoss(g);
    updateBeers(g);
    updateDrunk(g);

    // 飲みモーション
    if (g.isDrinking) {
      g.drinkTimer--;

      if (checkCaught(g)) {
        triggerMiss(g);
        return;
      }

      if (g.drinkTimer <= 0) {
        // 飲み終わり
        g.isDrinking = false;
        const isMetal = g.metalBeer === g.drinkPos;
        const baseScore = isMetal ? 500 : 100;
        g.combo++;
        const points = baseScore * g.combo;
        g.score += points;
        g.drunkGauge = Math.min(100, g.drunkGauge + (isMetal ? 15 : 8));

        if (isMetal) {
          g.metalBeer = -1;
          g.bonusText = `METAL! +${points}`;
        } else {
          g.bonusText = g.combo > 1 ? `${g.combo}COMBO! +${points}` : `+${points}`;
        }
        g.bonusTimer = FPS;

        // ギリギリセーフ判定
        if (g.bossTurnTimer > 0 && g.bossTurnTimer <= 3) {
          g.score += 200;
          g.safeFlash = FPS / 2;
          g.bonusText = `CLOSE! +${points + 200}`;
        }
      }
    }

    // 演出タイマー
    if (g.missFlash > 0) g.missFlash--;
    if (g.safeFlash > 0) g.safeFlash--;
    if (g.bonusTimer > 0) g.bonusTimer--;
  }, []);

  // ── 描画 ──
  const render = useCallback((ctx: CanvasRenderingContext2D, g: GameData) => {
    const w = CANVAS_W;
    const h = CANVAS_H;

    // LCD背景
    ctx.fillStyle = LCD_BG;
    ctx.fillRect(0, 0, w, h);

    // スキャンライン
    ctx.fillStyle = "rgba(0,0,0,0.03)";
    for (let y = 0; y < h; y += 3) {
      ctx.fillRect(0, y, w, 1);
    }

    if (g.state === "title") {
      renderTitle(ctx, g);
      return;
    }

    if (g.state === "gameover") {
      renderGameOver(ctx, g);
      return;
    }

    // ミスフラッシュ
    if (g.missFlash > 0 && g.missFlash % 2 === 0) {
      ctx.fillStyle = "rgba(200,50,50,0.15)";
      ctx.fillRect(0, 0, w, h);
    }

    // ギリギリセーフフラッシュ
    if (g.safeFlash > 0) {
      ctx.fillStyle = "rgba(200,200,50,0.1)";
      ctx.fillRect(0, 0, w, h);
    }

    // ── HUD ──
    ctx.fillStyle = LCD_DARK;
    ctx.font = "bold 16px 'DotGothic16', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`SCORE: ${String(g.score).padStart(5, "0")}`, 15, 30);
    ctx.textAlign = "right";
    // 残機
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < g.lives ? LCD_DARK : LCD_GHOST;
      ctx.fillText("🍺", w - 15 - (2 - i) * 28, 30);
    }
    // レベル
    ctx.fillStyle = LCD_DARK;
    ctx.font = "12px 'DotGothic16', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`LV.${g.level}`, 15, 50);

    // 酔いゲージ
    ctx.fillStyle = LCD_GHOST;
    ctx.fillRect(80, 40, 100, 10);
    ctx.fillStyle = g.drunkGauge > 70 ? "#c04040" : LCD_DARK;
    ctx.fillRect(80, 40, g.drunkGauge, 10);
    ctx.fillStyle = LCD_DARK;
    ctx.font = "10px 'DotGothic16', monospace";
    ctx.fillText("DRUNK", 185, 49);

    // ── カウンター ──
    ctx.fillStyle = LCD_DARK;
    ctx.fillRect(20, 400, w - 40, 4);

    // ── ビール（ゴースト含む） ──
    const beerY = 200;
    for (let i = 0; i < 3; i++) {
      const x = 60 + i * 140;
      // ゴースト（常に薄く表示）
      ctx.globalAlpha = 0.08;
      drawBeer(ctx, x, beerY, false);
      ctx.globalAlpha = 1.0;

      if (g.beers[i]) {
        const isMetal = g.metalBeer === i;
        if (isMetal) {
          // メタルビアキラキラ
          ctx.globalAlpha = 0.6 + 0.4 * Math.sin(g.frameCount * 0.3);
          drawBeer(ctx, x, beerY, true);
          ctx.globalAlpha = 1.0;
        } else {
          drawBeer(ctx, x, beerY, false);
        }
      }
    }

    // ── 店長 ──
    const bossX = 60 + g.bossPos * 140;
    const bossY = 300;
    // ゴースト（全ポジション）
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = 0.08;
      drawBoss(ctx, 60 + i * 140, bossY, "right", false);
      ctx.globalAlpha = 1.0;
    }
    drawBoss(ctx, bossX, bossY, g.bossLookDir, g.bossDir === "turning");

    // ── バイト ──
    const playerX = 60 + g.playerPos * 140;
    const playerY = 430;
    // ゴースト
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = 0.08;
      drawPlayer(ctx, 60 + i * 140, playerY, false);
      ctx.globalAlpha = 1.0;
    }
    drawPlayer(ctx, playerX, playerY, g.isDrinking);

    // ── ボーナステキスト ──
    if (g.bonusTimer > 0) {
      ctx.fillStyle = LCD_DARK;
      ctx.font = "bold 20px 'DotGothic16', monospace";
      ctx.textAlign = "center";
      ctx.globalAlpha = g.bonusTimer / FPS;
      ctx.fillText(g.bonusText, w / 2, 170);
      ctx.globalAlpha = 1.0;
    }

    // コンボ表示
    if (g.combo > 1 && !g.isDrinking) {
      ctx.fillStyle = LCD_DARK;
      ctx.font = "12px 'DotGothic16', monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${g.combo} COMBO`, w / 2, 510);
    }

    // 操作ガイド
    ctx.fillStyle = "rgba(26,32,16,0.3)";
    ctx.font = "10px 'DotGothic16', monospace";
    ctx.textAlign = "center";
    ctx.fillText("← → : いどう    SPACE : のむ", w / 2, h - 10);
  }, []);

  // ── タイトル画面 ──
  const renderTitle = (ctx: CanvasRenderingContext2D, g: GameData) => {
    ctx.fillStyle = LCD_DARK;
    ctx.textAlign = "center";

    ctx.font = "bold 28px 'DotGothic16', monospace";
    ctx.fillText("METAL BEER", CANVAS_W / 2, 160);
    ctx.font = "bold 22px 'DotGothic16', monospace";
    ctx.fillText("SOLID", CANVAS_W / 2, 195);

    ctx.font = "14px 'DotGothic16', monospace";
    ctx.fillText("〜 メタルビア・ソリッド 〜", CANVAS_W / 2, 240);

    // ビール装飾
    drawBeer(ctx, CANVAS_W / 2 - 70, 280, false);
    drawBeer(ctx, CANVAS_W / 2, 270, true);
    drawBeer(ctx, CANVAS_W / 2 + 70, 280, false);

    ctx.font = "12px 'DotGothic16', monospace";
    ctx.fillText("店長の目を盗んでビールを飲め！", CANVAS_W / 2, 360);

    // 点滅テキスト
    if (Math.floor(g.frameCount / 6) % 2 === 0) {
      ctx.font = "bold 16px 'DotGothic16', monospace";
      ctx.fillText("PRESS SPACE TO START", CANVAS_W / 2, 420);
    }

    if (g.highScore > 0) {
      ctx.font = "12px 'DotGothic16', monospace";
      ctx.fillText(`HI-SCORE: ${g.highScore}`, CANVAS_W / 2, 470);
    }

    ctx.font = "10px 'DotGothic16', monospace";
    ctx.fillStyle = "rgba(26,32,16,0.4)";
    ctx.fillText("← → : いどう    SPACE : のむ / スタート", CANVAS_W / 2, CANVAS_H - 15);
  };

  // ── ゲームオーバー ──
  const renderGameOver = (ctx: CanvasRenderingContext2D, g: GameData) => {
    ctx.fillStyle = LCD_DARK;
    ctx.textAlign = "center";

    ctx.font = "bold 28px 'DotGothic16', monospace";
    ctx.fillText("GAME OVER", CANVAS_W / 2, 160);

    ctx.font = "bold 18px 'DotGothic16', monospace";
    ctx.fillText("「クビだ！」", CANVAS_W / 2, 210);

    ctx.font = "16px 'DotGothic16', monospace";
    ctx.fillText(`SCORE: ${g.score}`, CANVAS_W / 2, 280);

    if (g.score >= g.highScore && g.score > 0) {
      ctx.font = "bold 14px 'DotGothic16', monospace";
      ctx.fillText("NEW RECORD!", CANVAS_W / 2, 310);
    }

    ctx.font = "12px 'DotGothic16', monospace";
    ctx.fillText(`HI-SCORE: ${g.highScore}`, CANVAS_W / 2, 350);

    if (Math.floor(g.frameCount / 6) % 2 === 0) {
      ctx.font = "bold 14px 'DotGothic16', monospace";
      ctx.fillText("PRESS SPACE TO RETRY", CANVAS_W / 2, 420);
    }
  };

  // ── ビール描画 ──
  const drawBeer = (ctx: CanvasRenderingContext2D, x: number, y: number, isMetal: boolean) => {
    ctx.save();
    // ジョッキ本体
    ctx.fillStyle = isMetal ? LCD_ACCENT : LCD_DARK;
    ctx.fillRect(x - 12, y - 20, 24, 30);
    // 取っ手
    ctx.fillRect(x + 12, y - 14, 8, 18);
    ctx.clearRect(x + 14, y - 10, 4, 10);
    // 泡
    ctx.fillRect(x - 14, y - 24, 28, 8);
    ctx.fillRect(x - 10, y - 28, 20, 6);

    if (isMetal) {
      // キラキラ
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.6;
      ctx.fillRect(x - 6, y - 18, 3, 3);
      ctx.fillRect(x + 4, y - 10, 2, 2);
      ctx.globalAlpha = 1.0;
    }
    ctx.restore();
  };

  // ── 店長描画 ──
  const drawBoss = (ctx: CanvasRenderingContext2D, x: number, y: number, lookDir: string, turning: boolean) => {
    ctx.save();
    ctx.fillStyle = turning ? "rgba(26,32,16,0.5)" : LCD_DARK;

    // 体（スーツ）
    ctx.fillRect(x - 14, y - 10, 28, 35);
    // 頭
    ctx.fillRect(x - 10, y - 30, 20, 22);
    // ネクタイ
    ctx.clearRect(x - 2, y - 8, 4, 20);

    // 目（向き表現）
    ctx.fillStyle = LCD_BG;
    if (lookDir === "left") {
      ctx.fillRect(x - 7, y - 24, 4, 4);
      ctx.fillRect(x + 1, y - 24, 4, 4);
      // 瞳
      ctx.fillStyle = turning ? "rgba(26,32,16,0.5)" : LCD_DARK;
      ctx.fillRect(x - 7, y - 24, 2, 4);
      ctx.fillRect(x + 1, y - 24, 2, 4);
    } else {
      ctx.fillRect(x - 7, y - 24, 4, 4);
      ctx.fillRect(x + 1, y - 24, 4, 4);
      ctx.fillStyle = turning ? "rgba(26,32,16,0.5)" : LCD_DARK;
      ctx.fillRect(x - 5, y - 24, 2, 4);
      ctx.fillRect(x + 3, y - 24, 2, 4);
    }

    // 「！」マーク（振り返り中）
    if (turning) {
      ctx.fillStyle = LCD_DARK;
      ctx.font = "bold 18px 'DotGothic16', monospace";
      ctx.textAlign = "center";
      ctx.fillText("!", x, y - 38);
    }

    // てんちょう
    ctx.fillStyle = LCD_DARK;
    ctx.font = "9px 'DotGothic16', monospace";
    ctx.textAlign = "center";
    ctx.fillText("てんちょう", x, y + 40);

    ctx.restore();
  };

  // ── バイト描画 ──
  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, drinking: boolean) => {
    ctx.save();
    ctx.fillStyle = LCD_DARK;

    // 体
    ctx.fillRect(x - 12, y - 8, 24, 32);
    // 頭
    ctx.fillRect(x - 9, y - 26, 18, 20);
    // キャップ
    ctx.fillRect(x - 11, y - 30, 22, 6);

    if (drinking) {
      // 飲みモーション：腕を上げてジョッキ
      ctx.fillRect(x + 12, y - 20, 6, 4);
      ctx.fillRect(x + 16, y - 28, 4, 12);
      // ジョッキ
      ctx.fillRect(x + 14, y - 38, 12, 14);
      // ゴクゴクエフェクト
      ctx.fillStyle = LCD_BG;
      ctx.fillRect(x - 5, y - 20, 3, 3);
      ctx.fillStyle = LCD_DARK;
      ctx.font = "10px 'DotGothic16', monospace";
      ctx.textAlign = "center";
      ctx.fillText("ゴクゴク", x, y + 38);
    } else {
      // 通常立ちポーズ
      ctx.fillRect(x - 18, y, 6, 4);
      ctx.fillRect(x + 12, y, 6, 4);
      ctx.font = "9px 'DotGothic16', monospace";
      ctx.textAlign = "center";
      ctx.fillText("バイト", x, y + 38);
    }

    ctx.restore();
  };

  // ── 入力ハンドラ ──
  const handleInput = useCallback((action: "left" | "right" | "drink") => {
    const g = gameRef.current;
    if (!g) return;

    if (g.state === "title") {
      if (action === "drink") {
        Object.assign(g, initGame(), { state: "playing", highScore: g.highScore });
      }
      return;
    }

    if (g.state === "gameover") {
      if (action === "drink") {
        Object.assign(g, initGame(), { state: "playing", highScore: g.highScore });
      }
      return;
    }

    if (g.state !== "playing") return;
    if (g.missFlash > 0) return; // ミス中は操作不可

    // 酔いによる操作遅延
    const drunkDelay = g.drunkGauge > 60 ? Math.random() < 0.3 : false;
    if (drunkDelay) return;

    if (action === "left" && !g.isDrinking) {
      g.playerPos = Math.max(0, g.playerPos - 1) as Pos;
    } else if (action === "right" && !g.isDrinking) {
      g.playerPos = Math.min(2, g.playerPos + 1) as Pos;
    } else if (action === "drink" && !g.isDrinking && g.beers[g.playerPos]) {
      g.isDrinking = true;
      g.drinkTimer = FPS; // 約1秒のモーション
      g.drinkPos = g.playerPos;
      g.beers[g.playerPos] = false;
      g.beerRespawnTimers[g.playerPos] = 0;
    }
  }, [initGame]);

  // ── ゲームループ初期化 ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    gameRef.current = initGame();

    const loop = (time: number) => {
      const elapsed = time - lastFrameRef.current;
      if (elapsed >= 1000 / FPS) {
        lastFrameRef.current = time;
        const g = gameRef.current!;
        g.frameCount++;
        update(g);
        render(ctx, g);
        setTick(t => t + 1);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [initGame, update, render]);

  // ── キーボード入力 ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") { e.preventDefault(); handleInput("left"); }
      else if (e.key === "ArrowRight" || e.key === "d") { e.preventDefault(); handleInput("right"); }
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleInput("drink"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleInput]);

  // ── タッチ操作 ──
  const touchStartX = useRef<number>(0);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative scanlines">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,20,60,0.3)_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* ヘッダー */}
        <nav className="sticky top-0 z-50 bg-gray-950/95 border-b-2 border-blue-400 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={() => setLocation("/")} className="font-pixel text-xs text-blue-400 hover:text-blue-300 transition-colors">
              ◀ もどる
            </button>
            <h1 className="font-pixel text-blue-300 text-sm">🎮 ゲーム 🎮</h1>
            <div className="font-pixel-en text-[8px] text-gray-500">GAME</div>
          </div>
        </nav>

        {/* ゲーム画面 */}
        <section className="py-8 px-4 flex flex-col items-center">
          <div className="mb-4 text-center">
            <h2 className="font-pixel text-lg text-yellow-300 mb-1">メタルビア・ソリッド</h2>
            <p className="font-pixel-en text-[8px] text-gray-500">METAL BEER SOLID</p>
          </div>

          {/* LCD風フレーム */}
          <div
            className="relative border-4 border-gray-700 rounded-lg p-2"
            style={{ background: "#3a3a2e", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.5)" }}
          >
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="block rounded"
              style={{ imageRendering: "pixelated", maxWidth: "100%", height: "auto" }}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(dx) > 30) {
                  handleInput(dx < 0 ? "left" : "right");
                } else {
                  handleInput("drink");
                }
              }}
            />
          </div>

          {/* モバイル操作ボタン */}
          <div className="mt-6 flex gap-4 md:hidden">
            <button
              onTouchStart={() => handleInput("left")}
              className="retro-card border-blue-400 bg-blue-900/30 rounded-none px-6 py-4 font-pixel text-blue-300 text-lg active:scale-95"
            >
              ◀
            </button>
            <button
              onTouchStart={() => handleInput("drink")}
              className="retro-card border-yellow-400 bg-yellow-900/30 rounded-none px-6 py-4 font-pixel text-yellow-300 text-sm active:scale-95"
            >
              のむ
            </button>
            <button
              onTouchStart={() => handleInput("right")}
              className="retro-card border-blue-400 bg-blue-900/30 rounded-none px-6 py-4 font-pixel text-blue-300 text-lg active:scale-95"
            >
              ▶
            </button>
          </div>

          {/* 説明 */}
          <div className="mt-8 max-w-md retro-card border-green-400 bg-green-900/20 rounded-none p-4 animate-pixel-fade-in">
            <h3 className="font-pixel text-sm text-green-300 mb-3">── あそびかた ──</h3>
            <ul className="space-y-2 font-pixel text-[10px] text-gray-300">
              <li>▸ ← → キー（またはスワイプ）でバイトを移動</li>
              <li>▸ スペースキー（またはタップ）でビールを飲む</li>
              <li>▸ 店長に見つからないように飲むべし！</li>
              <li>▸ 連続で飲むとコンボボーナス</li>
              <li>▸ 銀色のメタルビアは500点！</li>
              <li>▸ 飲みすぎると酔っ払って操作が…？</li>
              <li>▸ 3回見つかったらゲームオーバー（クビ！）</li>
            </ul>
          </div>
        </section>

        {/* フッター */}
        <footer className="py-8 px-4 border-t-2 border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <button onClick={() => setLocation("/")} className="font-pixel text-xs text-blue-400 hover:text-blue-300 transition-colors">
              ◀ トップにもどる
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
