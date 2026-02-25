/**
 * ラジオページ - ジェリービーンズコレクション推し活リンク
 */

import { useLocation } from "wouter";

const links = [
  {
    title: "Stand FM",
    description: "ジェリービーンズコレクションのStand FMチャンネル",
    url: "https://stand.fm/channels/638ff742df23c21009a836e7",
    icon: "📻",
    color: "border-orange-400",
    bgColor: "bg-orange-900/30",
    textColor: "text-orange-300",
  },
  {
    title: "Radio Talk",
    description: "ジェリービーンズコレクションのRadio Talkチャンネル",
    url: "https://radiotalk.jp/program/135800",
    icon: "🎙️",
    color: "border-pink-400",
    bgColor: "bg-pink-900/30",
    textColor: "text-pink-300",
  },
  {
    title: "YouTube",
    description: "ジェリービーンズコレクションのYouTubeチャンネル",
    url: "https://www.youtube.com/@jb.c",
    icon: "▶",
    color: "border-red-400",
    bgColor: "bg-red-900/30",
    textColor: "text-red-300",
  },
  {
    title: "X（いじま）",
    description: "いじまのXアカウント",
    url: "https://x.com/jbcizima",
    icon: "𝕏",
    color: "border-cyan-400",
    bgColor: "bg-cyan-900/30",
    textColor: "text-cyan-300",
  },
  {
    title: "X（あきはる）",
    description: "あきはるのXアカウント",
    url: "https://x.com/jbcakiharu",
    icon: "𝕏",
    color: "border-pink-400",
    bgColor: "bg-pink-900/30",
    textColor: "text-pink-300",
  },
];

export default function Radio() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative scanlines">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(60,40,0,0.3)_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* ヘッダー */}
        <nav className="sticky top-0 z-50 bg-gray-950/95 border-b-2 border-yellow-400 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={() => setLocation("/")} className="font-pixel text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
              ◀ もどる
            </button>
            <h1 className="font-pixel text-yellow-300 text-sm">📻 ラジオ 📻</h1>
            <div className="font-pixel-en text-[8px] text-gray-500">RADIO</div>
          </div>
        </nav>

        {/* タイトル */}
        <section className="py-12 px-4 text-center">
          <div className="flex gap-1 justify-center mb-6">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className={`w-3 h-3 ${i % 2 === 0 ? "bg-yellow-400" : "bg-orange-400"}`} />
            ))}
          </div>
          <h2 className="font-pixel text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 mb-4 leading-relaxed">
            ラジオ
          </h2>
          <p className="font-pixel text-xs text-gray-400">
            ジェリービーンズコレクション 推し活コーナー
          </p>
        </section>

        {/* コンビ紹介 */}
        <section className="px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="retro-card border-yellow-400 bg-yellow-900/20 rounded-none p-6 md:p-8 animate-pixel-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">🫘</span>
                <div>
                  <h3 className="font-pixel text-xl text-yellow-300 mb-1">
                    ジェリービーンズコレクション
                  </h3>
                  <span className="font-pixel-en text-[9px] text-gray-500">
                    JELLYBEANS COLLECTION
                  </span>
                </div>
              </div>

              <p className="font-pixel text-xs text-gray-300 leading-relaxed mb-4">
                北海道出身の男女お笑いコンビ。吉本興業所属。
                あきはる（女性・苫小牧市出身）といじま（男性・北広島市出身）の2人で活動中。
                ラジオ配信やYouTubeで活躍しています。
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-black/30 border border-pink-700 p-3">
                  <span className="font-pixel text-sm text-pink-300">あきはる</span>
                  <p className="font-pixel text-[10px] text-gray-400 mt-1">
                    女性 / 北海道苫小牧市出身 / 豆腐は木綿派
                  </p>
                </div>
                <div className="bg-black/30 border border-blue-700 p-3">
                  <span className="font-pixel text-sm text-blue-300">いじま</span>
                  <p className="font-pixel text-[10px] text-gray-400 mt-1">
                    男性 / 北海道北広島市出身 / 豆腐は絹派
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* リンク集 */}
        <section className="px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-pixel text-sm text-yellow-300 text-center mb-6">
              ── リンク集 ──
            </h3>
            <div className="space-y-4">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`retro-card ${link.color} ${link.bgColor} rounded-none p-4 block group animate-pixel-fade-in`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{link.icon}</span>
                    <div className="flex-1">
                      <h4 className={`font-pixel text-sm ${link.textColor}`}>
                        {link.title}
                      </h4>
                      <p className="font-pixel text-[10px] text-gray-400">
                        {link.description}
                      </p>
                    </div>
                    <span className={`font-pixel text-lg ${link.textColor} group-hover:translate-x-1 transition-transform`}>
                      ▶
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ファンページリンク */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <a
              href="/jellybeans"
              className="retro-card border-pink-400 bg-pink-900/20 rounded-none p-6 block group animate-pixel-fade-in"
            >
              <div className="text-center">
                <p className="font-pixel text-xs text-gray-400 mb-2">もっと詳しく見たい方は</p>
                <p className="font-pixel text-lg text-pink-300 group-hover:text-pink-200 transition-colors">
                  🫘 推し活ファンページへ ▶
                </p>
              </div>
            </a>
          </div>
        </section>

        {/* フッター */}
        <footer className="py-8 px-4 border-t-2 border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <button onClick={() => setLocation("/")} className="font-pixel text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
              ◀ トップにもどる
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
