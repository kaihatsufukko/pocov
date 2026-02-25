/**
 * アニメページ - ゾンビランドサガ / 鬼滅の刃 / 僕の心のヤバイやつ
 */

import { useLocation } from "wouter";

const animeList = [
  {
    title: "ゾンビランドサガ",
    titleEn: "ZOMBIE LAND SAGA",
    color: "border-purple-400",
    bgColor: "bg-purple-900/30",
    textColor: "text-purple-300",
    genre: "ゾンビ × アイドル × コメディ",
    studio: "MAPPA",
    director: "境 宗久",
    seasons: "第1期（2018年） / 第2期「リベンジ」（2021年） / 劇場版「ゆめぎんがパラダイス」（2025年）",
    story:
      "ゾンビとして蘇った7人の少女たちが、謎のプロデューサー・巽幸太郎に導かれ、佐賀県を救うためのご当地アイドルグループ「フランシュシュ」として活動する物語。それぞれ異なる時代に生きた少女たちが、時代を超えてアイドルとして輝く姿を描く。",
    characters: [
      "源さくら（CV: 本渡楓） — フランシュシュのセンター。記憶喪失の状態で目覚めた主人公",
      "二階堂サキ（CV: 田野アサミ） — リーダー。元レディース特攻隊長の仁義に厚い姉御",
      "水野愛（CV: 種田梨沙） — 元大人気アイドル「アイアンフリル」のセンター",
      "紺野純子（CV: 河瀬茉希） — 80年代アイドルブームの火付け役。プロ意識の高い銀髪少女",
      "ゆうぎり（CV: 衣川里佳） — 江戸時代生まれの伝説の花魁",
      "星川リリィ（CV: 田中美海） — 最年少の伝説の天才子役",
      "山田たえ（CV: 三石琴乃） — 唯一自我に目覚めていない謎のゾンビ",
      "巽幸太郎（CV: 宮野真守） — 破天荒なプロデューサー",
    ],
    highlight: "佐賀県とのコラボレーションで「聖地巡礼」が盛んに。ゾンビ×アイドルという斬新な組み合わせで、笑いあり涙ありの作品。",
  },
  {
    title: "鬼滅の刃",
    titleEn: "DEMON SLAYER",
    color: "border-red-400",
    bgColor: "bg-red-900/30",
    textColor: "text-red-300",
    genre: "ダークファンタジー / バトル",
    studio: "ufotable",
    director: "外崎春雄",
    originalAuthor: "吾峠呼世晴（週刊少年ジャンプ連載 2016-2020）",
    seasons:
      "竈門炭治郎 立志編（2019年） / 無限列車編・遊郭編（2021-2022年） / 刀鍛冶の里編（2023年） / 柱稽古編（2024年） / 劇場版 無限城編（2025年〜 三部作）",
    story:
      "大正時代。炭売りの少年・竈門炭治郎は、家族を鬼に殺され、唯一生き残った妹・禰豆子は鬼に変えられてしまう。妹を人間に戻すため、そして家族の仇を討つため、炭治郎は「鬼殺隊」に入隊し、鬼との壮絶な戦いに身を投じる。",
    characters: [
      "竈門炭治郎（CV: 花江夏樹） — 心優しい炭売りの少年。水の呼吸・ヒノカミ神楽の使い手",
      "竈門禰豆子（CV: 鬼頭明里） — 鬼にされた炭治郎の妹。人を襲わない強い意志を持つ",
      "我妻善逸（CV: 下野紘） — 臆病だが覚醒すると強い雷の呼吸の剣士",
      "嘴平伊之助（CV: 松岡禎丞） — 猪に育てられた野生児。獣の呼吸の使い手",
    ],
    highlight:
      "劇場版『無限列車編』は興行収入404.3億円で日本歴代1位。全世界累計発行部数2億2000万部突破。経済規模1兆円超えの社会現象に。",
  },
  {
    title: "僕の心のヤバイやつ",
    titleEn: "BOKU YABA",
    color: "border-sky-400",
    bgColor: "bg-sky-900/30",
    textColor: "text-sky-300",
    genre: "ラブコメディ / 青春",
    studio: "シンエイ動画",
    director: "赤城博昭",
    originalAuthor: "桜井のりお（秋田書店「チャンピオンクロス」連載）",
    seasons:
      "第1期（2023年4-6月） / 第2期（2024年1-3月） / 劇場版（2026年2月13日公開）",
    story:
      "中二病真っ最中の陰キャ少年・市川京太郎は、学園カースト頂点の美少女・山田杏奈の殺害を妄想する日々。しかし図書室で山田の意外な一面を知り、次第に殺意は恋心へと変わっていく。東京都目黒区洗足を舞台にした極甘青春ラブコメディ。",
    characters: [
      "市川京太郎（CV: 堀江瞬） — 中二病の陰キャ主人公。図書室で読書が趣味",
      "山田杏奈（CV: 羊宮妃那） — 学園のマドンナ。天真爛漫だが意外な一面も",
      "市川香菜（CV: 田村ゆかり） — 京太郎の姉",
      "足立翔（CV: 岡本信彦） — 京太郎のクラスメイト",
    ],
    highlight:
      "「次にくるマンガ大賞2020」Webマンガ部門第1位。音楽は牛尾憲輔、脚本は花田十輝と豪華スタッフ。劇場版は2026年2月13日に公開。",
  },
];

export default function Anime() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative scanlines">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(60,20,60,0.3)_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* ヘッダー */}
        <nav className="sticky top-0 z-50 bg-gray-950/95 border-b-2 border-pink-400 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={() => setLocation("/")} className="font-pixel text-xs text-pink-400 hover:text-pink-300 transition-colors">
              ◀ もどる
            </button>
            <h1 className="font-pixel text-pink-300 text-sm">📺 アニメ 📺</h1>
            <div className="font-pixel-en text-[8px] text-gray-500">ANIME</div>
          </div>
        </nav>

        {/* タイトル */}
        <section className="py-12 px-4 text-center">
          <div className="flex gap-1 justify-center mb-6">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className={`w-3 h-3 ${i % 2 === 0 ? "bg-pink-400" : "bg-purple-400"}`} />
            ))}
          </div>
          <h2 className="font-pixel text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-4 leading-relaxed">
            アニメ
          </h2>
          <p className="font-pixel text-xs text-gray-400">
            おすすめアニメ作品を紹介
          </p>
        </section>

        {/* アニメ一覧 */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {animeList.map((anime) => (
              <div
                key={anime.title}
                className={`retro-card ${anime.color} ${anime.bgColor} rounded-none p-6 md:p-8 animate-pixel-fade-in`}
              >
                {/* タイトル */}
                <div className="mb-6">
                  <h3 className={`font-pixel text-xl md:text-2xl ${anime.textColor} mb-1`}>
                    {anime.title}
                  </h3>
                  <span className="font-pixel-en text-[9px] text-gray-500">
                    {anime.titleEn}
                  </span>
                </div>

                {/* 基本情報 */}
                <div className="grid gap-2 mb-6">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-pixel text-xs text-gray-500 sm:w-24 shrink-0">ジャンル</span>
                    <span className="font-pixel text-xs text-gray-300">{anime.genre}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-pixel text-xs text-gray-500 sm:w-24 shrink-0">制作</span>
                    <span className="font-pixel text-xs text-gray-300">{anime.studio}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-pixel text-xs text-gray-500 sm:w-24 shrink-0">監督</span>
                    <span className="font-pixel text-xs text-gray-300">{anime.director}</span>
                  </div>
                  {"originalAuthor" in anime && (
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <span className="font-pixel text-xs text-gray-500 sm:w-24 shrink-0">原作</span>
                      <span className="font-pixel text-xs text-gray-300">{anime.originalAuthor}</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-pixel text-xs text-gray-500 sm:w-24 shrink-0">シーズン</span>
                    <span className="font-pixel text-xs text-gray-300">{anime.seasons}</span>
                  </div>
                </div>

                {/* ストーリー */}
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <h4 className={`font-pixel text-sm ${anime.textColor} mb-3`}>
                    ── ストーリー ──
                  </h4>
                  <p className="font-pixel text-xs text-gray-300 leading-relaxed">
                    {anime.story}
                  </p>
                </div>

                {/* キャラクター */}
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <h4 className={`font-pixel text-sm ${anime.textColor} mb-3`}>
                    ── キャラクター ──
                  </h4>
                  <ul className="space-y-2">
                    {anime.characters.map((char, i) => (
                      <li key={i} className="font-pixel text-[10px] text-gray-300 leading-relaxed pl-4 relative">
                        <span className={`absolute left-0 ${anime.textColor}`}>▸</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ハイライト */}
                <div className="bg-black/30 border border-gray-700 p-3">
                  <p className={`font-pixel text-[10px] ${anime.textColor} leading-relaxed`}>
                    ★ {anime.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* フッター */}
        <footer className="py-8 px-4 border-t-2 border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <button onClick={() => setLocation("/")} className="font-pixel text-xs text-pink-400 hover:text-pink-300 transition-colors">
              ◀ トップにもどる
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
