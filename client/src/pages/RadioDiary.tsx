import { useState } from "react";
import { Radio, Mic, Star, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

interface DiaryEntry {
  id: number;
  title: string;
  date: string;
  platform: string;
  content: string;
  rating: number;
}

const diaryEntries: DiaryEntry[] = [
  {
    id: 3,
    title: "スタエフのエラー",
    date: "2026年2月13日（金）",
    platform: "Radio Talk",
    content:
      "　スタンドFMで収録後に、くるくる回ってフリーズしてしまった時、保存できないエラー、めっちゃあせりますよね。一人ならまだしも、人と録ってるとまたお願いしづらいですからね💦\n　僕も先月くるくるして止まってしまい、冷や汗たらたら流しながらチャットGPTに聞きながら試した対処法。収録したデータを消さずに済んだ方法。\n\t1.\t通信まわりだけ揺さぶる\n\t　・Wi-Fi ⇄ モバイル通信を切り替え\n\t　・機内モードON→OFF\n\t2.\t「端末の再起動」\n\t　・アプリ強制終了より、端末再起動の方が\u201C下書きとして残る\u201D期待があるとのこと。\n　私は端末を再起動して、スタンドFM再起動で、前回の収録を使用しますか？的なメッセージが出て、事なきを得ました。\n　運が良かったのかもしれません。でも、バックアップで録音するのはめんどくさい〜😹",
    rating: 5,
  },
  {
    id: 1,
    title: "最高に面白かった回！",
    date: "2025年12月15日",
    platform: "Stand FM",
    content:
      "ジェリービーンズコレクションのラジオは本当に面白いです。毎週楽しみにしています。このエピソードは特に笑いました！メンバーの掛け合いが最高です。",
    rating: 5,
  },
  {
    id: 2,
    title: "ラジオで元気をもらってます",
    date: "2025年12月10日",
    platform: "Radio Talk",
    content:
      "毎日仕事が大変ですが、ジェリービーンズコレクションのラジオを聴くと元気が出ます。二人の掛け合いが最高です。これからも応援しています！",
    rating: 5,
  },
];

const VISIBLE_LINES = 3;

export default function RadioDiary() {
  const [, setLocation] = useLocation();
  const [expandedEntries, setExpandedEntries] = useState<Set<number>>(
    new Set(),
  );

  const toggleExpand = (id: number) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* ナビゲーション */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-blue-400">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/images/jbc-logo.png"
              alt="JBC Logo"
              className="w-12 h-12"
            />
            <span className="text-sm font-bold text-gray-700">
              ジェリコレのラジオ日記
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://stand.fm/channels/638ff742df23c21009a836e7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-orange-500 font-bold hover:opacity-80 transition-all"
            >
              <Radio className="w-5 h-5" />
              <span className="hidden sm:inline">Stand FM</span>
            </a>
            <a
              href="https://radiotalk.jp/program/135800"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-pink-500 font-bold hover:opacity-80 transition-all"
            >
              <Mic className="w-5 h-5" />
              <span className="hidden sm:inline">Radio Talk</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full opacity-20 animate-bubble"></div>
        <div
          className="absolute top-20 right-12 w-24 h-24 bg-pink-300 rounded-full opacity-25 animate-bubble"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-15 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-200 rounded-full opacity-20 animate-bubble"
          style={{ animationDelay: "0.8s" }}
        ></div>

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          {/* ジェリービーンズ装飾 */}
          <div className="flex justify-center gap-1 mb-6 flex-wrap">
            {[
              "/images/jelly-yellow-pixel.png",
              "/images/jelly-pink-pixel.png",
              "/images/jelly-cyan-pixel.png",
              "/images/jelly-green-pixel.png",
              "/images/jelly-yellow-pixel.png",
              "/images/jelly-pink-pixel.png",
              "/images/jelly-cyan-pixel.png",
              "/images/jelly-green-pixel.png",
            ].map((img, i) => (
              <img
                key={`deco-${i}`}
                src={img}
                alt="jelly"
                className={`w-5 h-4 ${i % 2 === 0 ? "animate-jelly-blink" : "animate-jelly-blink-fast"}`}
                style={{
                  animationDelay: `${Math.random() * 0.6}s`,
                }}
              />
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            ジェリコレのラジオ日記
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            男女コンビ ジェリービーンズコレクションのラジオを聴いた感想などを残しておく場所です。
          </p>

          {/* ジェリービーンズ装飾 */}
          <div className="flex justify-center gap-1 mt-6 flex-wrap">
            {[
              "/images/jelly-green-pixel.png",
              "/images/jelly-cyan-pixel.png",
              "/images/jelly-pink-pixel.png",
              "/images/jelly-yellow-pixel.png",
              "/images/jelly-green-pixel.png",
              "/images/jelly-cyan-pixel.png",
              "/images/jelly-pink-pixel.png",
              "/images/jelly-yellow-pixel.png",
            ].map((img, i) => (
              <img
                key={`deco2-${i}`}
                src={img}
                alt="jelly"
                className={`w-5 h-4 ${i % 2 === 0 ? "animate-jelly-blink-fast" : "animate-jelly-blink"}`}
                style={{
                  animationDelay: `${Math.random() * 0.6}s`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 日記エントリー一覧 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-8">
            {diaryEntries.map((entry) => (
              <article
                key={entry.id}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-pink-200"
              >
                {/* 日付とプラットフォーム */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <span className="text-sm text-gray-500 font-medium">
                    {entry.date}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white ${
                      entry.platform === "Stand FM"
                        ? "bg-orange-400"
                        : "bg-pink-400"
                    }`}
                  >
                    {entry.platform === "Stand FM" ? (
                      <Radio className="w-3 h-3" />
                    ) : (
                      <Mic className="w-3 h-3" />
                    )}
                    {entry.platform}
                  </span>
                </div>

                {/* タイトル */}
                <h3 className="text-xl font-black text-gray-800 mb-3">
                  {entry.title}
                </h3>

                {/* 星評価 */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= entry.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* 本文 */}
                {(() => {
                  const lines = entry.content.split("\n");
                  const isLong = lines.length > VISIBLE_LINES;
                  const isExpanded = expandedEntries.has(entry.id);
                  const displayLines =
                    isLong && !isExpanded
                      ? lines.slice(0, VISIBLE_LINES)
                      : lines;

                  return (
                    <>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {displayLines.join("\n")}
                      </p>
                      {isLong && (
                        <button
                          onClick={() => toggleExpand(entry.id)}
                          className="mt-3 flex items-center gap-1 text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          />
                          {isExpanded ? "とじる" : "つづきを読む"}
                        </button>
                      )}
                    </>
                  );
                })()}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/images/jelly-footer.png"
              alt="jelly"
              className="w-8 h-8"
            />
            <p className="text-lg font-bold">ジェリコレのラジオ日記</p>
            <img
              src="/images/jelly-footer.png"
              alt="jelly"
              className="w-8 h-8"
            />
          </div>
          <button
            onClick={() => setLocation("/jellybeans")}
            className="inline-block bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-full transition-all mb-4"
          >
            TOPに戻る
          </button>
          <p className="text-sm opacity-90">
            &copy; 2025 Jellybeans Collection Fan Page. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
