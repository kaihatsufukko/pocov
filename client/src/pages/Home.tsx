/**
 * 粋なデジタルをありがとう トップページ
 *
 * デザイン方針：
 * - 8bit〜16bit レトロゲーム風デザイン
 * - ファミコン・ゲームボーイ・メガドライブをイメージ
 * - ピクセルフォント・ドット絵的な雰囲気
 */

import { useLocation } from "wouter";

const categories = [
  {
    id: "music",
    title: "おんがく",
    titleEn: "MUSIC",
    description: "ピコピコサウンドの世界",
    color: "from-green-400 to-green-600",
    borderColor: "border-green-400",
    bgColor: "bg-green-900/40",
    textColor: "text-green-300",
    href: "/music",
    icon: "♪",
  },
  {
    id: "radio",
    title: "ラジオ",
    titleEn: "RADIO",
    description: "推し活コーナー",
    color: "from-yellow-400 to-orange-500",
    borderColor: "border-yellow-400",
    bgColor: "bg-yellow-900/40",
    textColor: "text-yellow-300",
    href: "/radio",
    icon: "📻",
  },
  {
    id: "game",
    title: "ゲーム",
    titleEn: "GAME",
    description: "なつかしの名作たち",
    color: "from-blue-400 to-blue-600",
    borderColor: "border-blue-400",
    bgColor: "bg-blue-900/40",
    textColor: "text-blue-300",
    href: "/games",
    icon: "🎮",
  },
  {
    id: "anime",
    title: "アニメ",
    titleEn: "ANIME",
    description: "おすすめアニメ紹介",
    color: "from-pink-400 to-purple-500",
    borderColor: "border-pink-400",
    bgColor: "bg-pink-900/40",
    textColor: "text-pink-300",
    href: "/anime",
    icon: "📺",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative scanlines overflow-hidden">
      {/* スキャンライン背景 */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,60,20,0.3)_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

      {/* メインコンテンツ */}
      <div className="relative z-10">
        {/* ヒーローセクション */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-12 pb-8">
          {/* ピクセルアート的な装飾ライン */}
          <div className="flex gap-1 mb-8">
            {["bg-red-500","bg-yellow-400","bg-green-400","bg-cyan-400","bg-blue-500","bg-purple-500","bg-pink-500","bg-red-500"].map((c, i) => (
              <div key={i} className={`w-4 h-4 ${c}`} style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>

          {/* タイトル */}
          <div className="text-center animate-pixel-fade-in">
            <h1 className="font-pixel text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-green-300 to-yellow-300 mb-4 leading-relaxed">
              粋なデジタルを
            </h1>
            <h1 className="font-pixel text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-6 leading-relaxed">
              ありがとう
            </h1>
          </div>

          {/* サブタイトル */}
          <p className="font-pixel text-sm md:text-base text-gray-400 mb-2 tracking-wider animate-pixel-fade-in" style={{ animationDelay: "0.2s" }}>
            8bit ・ 16bit ・ レトロカルチャー
          </p>
          <p className="font-pixel-en text-[10px] text-gray-500 mb-12 tracking-widest animate-pixel-fade-in" style={{ animationDelay: "0.3s" }}>
            FAMICOM / GAME BOY / MEGA DRIVE
          </p>

          {/* ピクセルアート的な装飾ライン */}
          <div className="flex gap-1 mb-12">
            {["bg-pink-500","bg-purple-500","bg-blue-500","bg-cyan-400","bg-green-400","bg-yellow-400","bg-red-500","bg-pink-500"].map((c, i) => (
              <div key={i} className={`w-4 h-4 ${c}`} />
            ))}
          </div>

          {/* セレクト画面風テキスト */}
          <div className="font-pixel text-green-400 text-sm animate-[blink-cursor_1s_ease-in-out_infinite]">
            ▼ カテゴリをえらんでね ▼
          </div>
        </section>

        {/* カテゴリ選択セクション */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setLocation(cat.href)}
                className={`retro-card ${cat.borderColor} ${cat.bgColor} rounded-none p-6 text-left group animate-pixel-fade-in`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h2 className={`font-pixel text-xl ${cat.textColor}`}>
                        {cat.title}
                      </h2>
                      <span className="font-pixel-en text-[9px] text-gray-500">
                        {cat.titleEn}
                      </span>
                    </div>
                    <p className="font-pixel text-xs text-gray-400">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <div className={`mt-4 text-right font-pixel text-xs ${cat.textColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  ▶ PRESS START
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 推し活サイトリンク（ジェリービーンズコレクション） */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <a
              href="/jellybeans"
              className="retro-card border-pink-400 bg-pink-900/30 rounded-none p-6 block group animate-pixel-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🫘</span>
                <div className="flex-1">
                  <h3 className="font-pixel text-lg text-pink-300 mb-1">
                    ジェリービーンズコレクション
                  </h3>
                  <p className="font-pixel text-xs text-gray-400">
                    推し活サイト ─ 北海道出身の男女お笑いコンビ
                  </p>
                </div>
                <span className="font-pixel text-pink-400 text-lg group-hover:translate-x-1 transition-transform">
                  ▶
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* フッター */}
        <footer className="py-12 px-4 border-t-2 border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex gap-1 justify-center mb-4">
              {["bg-red-500","bg-yellow-400","bg-green-400","bg-cyan-400","bg-blue-500","bg-purple-500"].map((c, i) => (
                <div key={i} className={`w-2 h-2 ${c}`} />
              ))}
            </div>
            <p className="font-pixel text-xs text-gray-500">
              &copy; 2025 粋なデジタルをありがとう
            </p>
            <p className="font-pixel-en text-[8px] text-gray-600 mt-2">
              POWERED BY RETRO LOVE
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
