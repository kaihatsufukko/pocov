/**
 * 音楽ページ - 中井設計 / サイモンガー・モバイル
 */

import { useLocation } from "wouter";

const artists = [
  {
    name: "中井設計",
    nameEn: "NAKAI SEKKEI",
    color: "border-cyan-400",
    bgColor: "bg-cyan-900/30",
    textColor: "text-cyan-300",
    description: [
      "渋谷La.mamaなどのライブハウスで活動するインディーズ音楽アクト。",
      "ジャンルの枠にとらわれない独自のスタイルで、ライブを中心に活動を展開している。",
      "「設計」という名前が示すように、緻密に構築されたサウンドが特徴的。",
    ],
    details: {
      ジャンル: "インディーズ / ライブミュージック",
      活動拠点: "東京（渋谷La.mama 他）",
      スタイル: "ライブパフォーマンスを軸とした活動",
    },
  },
  {
    name: "サイモンガー・モバイル",
    nameEn: "SIMONGER MOBILE",
    color: "border-green-400",
    bgColor: "bg-green-900/30",
    textColor: "text-green-300",
    description: [
      "ニンテンドー3DS用音楽制作ソフト「KORG M01D」やNintendo Switch「KORG Gadget」を駆使して、手のひらサイズのガジェット楽器で最小規模のファンクを夫婦で演奏するユニット。",
      "2008年より活動を開始し、機動力を活かして全国でライブ活動を行っている。",
      "8bit的なピコピコサウンドとファンクを融合させた「モバイルファンク」という独自ジャンルを確立。",
    ],
    details: {
      ジャンル: "モバイルファンク",
      メンバー: "サイモンガー（Vocal・各種ガジェット楽器） / 嫁モバイル（メロディオン・コーラス）",
      レーベル: "黄泉モバイルレコーズ",
      活動開始: "2008年〜",
      使用機材: "KORG M01D / KORG Gadget for Nintendo Switch / 鼻笛 / カズー",
    },
    discography: [
      { title: "モバイルファンクの頂点", subtitle: "TOP OF MOBILE FUNK", year: "2014", desc: "3DSから紡ぎだす強烈なファンクサウンドの1stアルバム" },
      { title: "ズボンのすそが靴に入っていた", subtitle: "MASTER OF MOBILE FUNK", year: "2018", desc: "某老舗音楽雑誌で10点満点を獲得したセカンドアルバム" },
      { title: "モバイルファンクの闇", subtitle: "DARKNESS OF MOBILE FUNK", year: "2022", desc: "Nintendo Switchに制作環境を移した意欲的サードアルバム（全13曲）" },
      { title: "嫁モバ☆タイム", subtitle: "YOME MOBA TIME", year: "2024", desc: "嫁モバイルのソロデビューアルバム（サイモンガー全面プロデュース）" },
    ],
  },
];

export default function Music() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative scanlines">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,60,20,0.3)_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* ヘッダー */}
        <nav className="sticky top-0 z-50 bg-gray-950/95 border-b-2 border-green-400 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={() => setLocation("/")} className="font-pixel text-xs text-green-400 hover:text-green-300 transition-colors">
              ◀ もどる
            </button>
            <h1 className="font-pixel text-green-300 text-sm">♪ おんがく ♪</h1>
            <div className="font-pixel-en text-[8px] text-gray-500">MUSIC</div>
          </div>
        </nav>

        {/* タイトル */}
        <section className="py-12 px-4 text-center">
          <div className="flex gap-1 justify-center mb-6">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className={`w-3 h-3 ${i % 2 === 0 ? "bg-green-400" : "bg-cyan-400"}`} />
            ))}
          </div>
          <h2 className="font-pixel text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300 mb-4 leading-relaxed">
            おんがく
          </h2>
          <p className="font-pixel text-xs text-gray-400">
            ピコピコサウンドと独自の音楽世界
          </p>
        </section>

        {/* アーティスト一覧 */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {artists.map((artist) => (
              <div
                key={artist.name}
                className={`retro-card ${artist.color} ${artist.bgColor} rounded-none p-6 md:p-8 animate-pixel-fade-in`}
              >
                {/* アーティスト名 */}
                <div className="mb-6">
                  <h3 className={`font-pixel text-2xl ${artist.textColor} mb-1`}>
                    {artist.name}
                  </h3>
                  <span className="font-pixel-en text-[9px] text-gray-500">
                    {artist.nameEn}
                  </span>
                </div>

                {/* 説明 */}
                <div className="space-y-3 mb-6">
                  {artist.description.map((text, i) => (
                    <p key={i} className="font-pixel text-xs text-gray-300 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>

                {/* 詳細情報 */}
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <h4 className={`font-pixel text-sm ${artist.textColor} mb-3`}>
                    ── プロフィール ──
                  </h4>
                  <dl className="space-y-2">
                    {Object.entries(artist.details).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:gap-4">
                        <dt className="font-pixel text-xs text-gray-500 sm:w-24 shrink-0">{key}</dt>
                        <dd className="font-pixel text-xs text-gray-300">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* ディスコグラフィー（サイモンガー・モバイルのみ） */}
                {artist.discography && (
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className={`font-pixel text-sm ${artist.textColor} mb-4`}>
                      ── ディスコグラフィー ──
                    </h4>
                    <div className="grid gap-3">
                      {artist.discography.map((album) => (
                        <div key={album.title} className="bg-black/30 border border-gray-700 p-3">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className={`font-pixel text-xs ${artist.textColor}`}>
                              {album.title}
                            </span>
                            <span className="font-pixel-en text-[8px] text-gray-500">
                              ({album.year})
                            </span>
                          </div>
                          <p className="font-pixel-en text-[7px] text-gray-600 mb-1">
                            {album.subtitle}
                          </p>
                          <p className="font-pixel text-[10px] text-gray-400">
                            {album.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* フッター */}
        <footer className="py-8 px-4 border-t-2 border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <button onClick={() => setLocation("/")} className="font-pixel text-xs text-green-400 hover:text-green-300 transition-colors">
              ◀ トップにもどる
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
