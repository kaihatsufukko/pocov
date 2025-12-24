/**
 * ポコポコ村のオフィシャルホームページ
 * 
 * デザイン方針：
 * - 木製看板のトップ画像を活かしたシンプルなデザイン
 * - 温かみのある自然な色合い（クリーム色背景、茶色系テキスト）
 * - 最小限の要素で村の世界観を表現
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container py-4">
          <h1 className="text-2xl font-bold text-amber-900">ポコポコ村</h1>
          <p className="text-sm text-amber-700">Official Site</p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container py-12">
        {/* ヒーロー画像 */}
        <section className="mb-12">
          <img
            src="/images/hero-sign.png"
            alt="ポコポコ村の看板"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
        </section>

        {/* ウェルカムセクション */}
        <section className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">ようこそ</h2>
          <p className="text-amber-800 leading-relaxed">
            ポコポコ村へようこそ。緑に囲まれた自然豊かな村で、
            のんびりとした時間をお過ごしください。
          </p>
        </section>

        {/* フッター */}
        <footer className="text-center text-amber-700 text-sm mt-12">
          <p>&copy; 2025 ポコポコ村. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
