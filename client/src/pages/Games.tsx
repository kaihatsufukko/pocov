/**
 * ゲームページ - SAGA2 / キングコング2 / 十王剣の謎 / レッドアリーマー
 */

import { useLocation } from "wouter";

const games = [
  {
    title: "Sa・Ga2 秘宝伝説",
    titleEn: "FINAL FANTASY LEGEND II",
    color: "border-yellow-400",
    bgColor: "bg-yellow-900/30",
    textColor: "text-yellow-300",
    platform: "ゲームボーイ",
    year: "1990年12月14日",
    developer: "スクウェア（現スクウェア・エニックス）",
    genre: "RPG",
    price: "4,800円",
    story:
      "主人公がまだ幼い頃、父は秘宝「精霊の鏡」を託して家を出た。成長した主人公は帰らぬ父を捜すため、学校の仲間3人と旅に出る。「天の柱」で繋がれた9つの異世界を巡り、全77個の秘宝を集める壮大な冒険が始まる。",
    features: [
      "人間・エスパー・メカ・モンスターの4種族から仲間を選択",
      "経験値によらない独自の成長システム",
      "武器や防具の使用回数制限による戦略的なリソース管理",
      "和風・中世・未来都市など多様な9つの世界",
      "秘宝を集めた「新しき神」たちとの戦い",
      "作曲は植松伸夫と伊藤賢治が担当",
    ],
    evaluation: "ファミコン通信クロスレビュー合計33点（ゴールド殿堂入り）",
    remake: "2009年 ニンテンドーDS『サガ2秘宝伝説 GODDESS OF DESTINY』としてリメイク",
  },
  {
    title: "キングコング2 怒りのメガトンパンチ",
    titleEn: "KING KONG 2: IKARI NO MEGATON PUNCH",
    color: "border-red-400",
    bgColor: "bg-red-900/30",
    textColor: "text-red-300",
    platform: "ファミリーコンピュータ",
    year: "1986年12月18日",
    developer: "コナミ（開発2課）",
    genre: "アクション",
    price: "5,300円",
    story:
      "映画『キングコング2』を題材にしたアクションゲーム。キングコングとなってステージを破壊しつくす爽快感が魅力。さらわれたレディコングを助け出すのが目的。",
    features: [
      "パンチ・踏み付け・岩投げの3種類の攻撃が可能",
      "マップ上の障害物も破壊できる爽快感",
      "全9ステージ構成",
      "ボスを倒しワープの扉を見つけて進む",
      "クリア後もループで2周目、3周目と続く",
      "音楽は山下絹代氏ら実力派が担当",
    ],
    evaluation: "一時はコナミの代表キャラにもなった人気作",
    note: "タイトルに『2』とあるがファミコンゲームとしては1作目。映画『キングコング2』のゲーム化作品。",
  },
  {
    title: "ポケットザウルス 十王剣の謎",
    titleEn: "POCKET ZAURUS: JUOUKEN NO NAZO",
    color: "border-green-400",
    bgColor: "bg-green-900/30",
    textColor: "text-green-300",
    platform: "ファミリーコンピュータ",
    year: "1987年2月27日",
    developer: "バンダイ",
    genre: "横スクロールアクション",
    story:
      "西暦2001年の地球。歴史学者であり科学者でもあるハシモト名人は、サラマンダーに魔法をかけられ恐竜の姿に変えられてしまう。強い精神力で心は正義のまま、ブーメランを手にタイムマシンでサラマンダーを追いかける旅に出る。",
    features: [
      "全5面（恐竜島→妖怪魔境・未来都市・エジプトをランダム順→神々の時代）",
      "武器はブーメラン。パワーシールドで3連射にパワーアップ",
      "アクション中にクイズやシューティングパートも登場",
      "各ボスを倒して「十王剣」を入手。全て集めないとラスボスに勝てない",
      "十王剣の配置にはヒントの暗号解読が必要",
      "「ボクモード」と「パパモード」の2つの難易度",
    ],
    evaluation: "ファミコン通信クロスレビュー合計23点（満40点）",
    note: "バンダイのキャラクター文具『ポケットザウルス』がモチーフ。一般の子供たちが「少年ゲームクリエイター」として制作に参加した異色作。",
  },
  {
    title: "レッドアリーマー 魔界村外伝",
    titleEn: "GARGOYLE'S QUEST",
    color: "border-purple-400",
    bgColor: "bg-purple-900/30",
    textColor: "text-purple-300",
    platform: "ゲームボーイ",
    year: "1990年5月2日",
    developer: "カプコン",
    genre: "アクションRPG",
    story:
      "『魔界村』シリーズの敵キャラクター「レッドアリーマー」が主人公。戦士の試験から帰ると、謎の大軍団に襲われ魔界が壊滅状態に。レッドアリーマーは魔界を救うため、各地の魔王たちと協力しながら戦いに挑む。",
    features: [
      "アクションパートとRPGパートの2構成",
      "翼で空を飛ぶ「ホバリング」、壁に張り付く「ヘルクライム」などの独特なアクション",
      "ステージクリアごとに新しい魔力（バスター、クロー、ダークファイヤー）を獲得",
      "RPGパートでフィールドを移動し、敵と遭遇するとアクションパートに切り替わる",
      "カプコン初の携帯型ゲーム機参入タイトル",
      "『魔界村』の最強雑魚敵が主人公という逆転の発想",
    ],
    evaluation: "魔界村シリーズとしては難易度低めだが、それでも歯ごたえのあるアクション",
    note: "続編『レッドアリーマーII』（FC/1992年）、『魔界村外伝 THE DEMON DARKNESS』（GB/1993年）、SFCの『デモンズブレイゾン』へと続くシリーズ。",
  },
];

export default function Games() {
  const [, setLocation] = useLocation();

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

        {/* タイトル */}
        <section className="py-12 px-4 text-center">
          <div className="flex gap-1 justify-center mb-6">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className={`w-3 h-3 ${i % 2 === 0 ? "bg-blue-400" : "bg-yellow-400"}`} />
            ))}
          </div>
          <h2 className="font-pixel text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-yellow-300 mb-4 leading-relaxed">
            ゲーム
          </h2>
          <p className="font-pixel text-xs text-gray-400">
            ファミコン・ゲームボーイの名作たち
          </p>
        </section>

        {/* ゲーム一覧 */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {games.map((game) => (
              <div
                key={game.title}
                className={`retro-card ${game.color} ${game.bgColor} rounded-none p-6 md:p-8 animate-pixel-fade-in`}
              >
                {/* タイトル */}
                <div className="mb-6">
                  <h3 className={`font-pixel text-xl md:text-2xl ${game.textColor} mb-1`}>
                    {game.title}
                  </h3>
                  <span className="font-pixel-en text-[9px] text-gray-500">
                    {game.titleEn}
                  </span>
                </div>

                {/* 基本情報 */}
                <div className="grid gap-2 mb-6">
                  {[
                    ["機種", game.platform],
                    ["発売日", game.year],
                    ["開発", game.developer],
                    ["ジャンル", game.genre],
                    ...(game.price ? [["価格", game.price]] : []),
                  ].map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:gap-4">
                      <span className="font-pixel text-xs text-gray-500 sm:w-20 shrink-0">{key}</span>
                      <span className="font-pixel text-xs text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>

                {/* ストーリー */}
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <h4 className={`font-pixel text-sm ${game.textColor} mb-3`}>
                    ── ストーリー ──
                  </h4>
                  <p className="font-pixel text-xs text-gray-300 leading-relaxed">
                    {game.story}
                  </p>
                </div>

                {/* 特徴 */}
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <h4 className={`font-pixel text-sm ${game.textColor} mb-3`}>
                    ── 特徴 ──
                  </h4>
                  <ul className="space-y-2">
                    {game.features.map((feature, i) => (
                      <li key={i} className="font-pixel text-[10px] text-gray-300 leading-relaxed pl-4 relative">
                        <span className={`absolute left-0 ${game.textColor}`}>▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 評価・補足 */}
                <div className="space-y-2">
                  <div className="bg-black/30 border border-gray-700 p-3">
                    <p className={`font-pixel text-[10px] ${game.textColor}`}>
                      ★ {game.evaluation}
                    </p>
                  </div>
                  {game.note && (
                    <div className="bg-black/30 border border-gray-700 p-3">
                      <p className="font-pixel text-[10px] text-gray-400">
                        ※ {game.note}
                      </p>
                    </div>
                  )}
                  {game.remake && (
                    <div className="bg-black/30 border border-gray-700 p-3">
                      <p className="font-pixel text-[10px] text-gray-400">
                        リメイク: {game.remake}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
