/**
 * ポコポコ村のオフィシャルホームページ
 *
 * デザイン方針：
 * - 現代風のモダンなデザイン
 * - スムーズなアニメーションとトランジション
 * - 自然をテーマにしたグリーン系カラー
 * - フルスクリーンヒーローセクション
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50">
      {/* ナビゲーション */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl text-emerald-800">
              ポコポコ村
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-emerald-700 hover:text-emerald-900 transition-colors font-medium"
            >
              村について
            </a>
            <a
              href="#features"
              className="text-emerald-700 hover:text-emerald-900 transition-colors font-medium"
            >
              見どころ
            </a>
            <a
              href="#access"
              className="text-emerald-700 hover:text-emerald-900 transition-colors font-medium"
            >
              アクセス
            </a>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              お問い合わせ
            </Button>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* テキストコンテンツ */}
            <div className="text-center lg:text-left space-y-6 animate-[fadeIn_1s_ease-out]">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                自然と暮らす、心豊かな村
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 leading-tight">
                ようこそ
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                  ポコポコ村
                </span>
                へ
              </h1>
              <p className="text-lg text-emerald-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                緑に囲まれた自然豊かな村で、のんびりとした時間をお過ごしください。
                四季折々の美しい風景と温かい村人たちがお待ちしています。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8"
                >
                  村を探検する
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-lg px-8"
                >
                  もっと詳しく
                </Button>
              </div>
            </div>

            {/* ヒーロー画像 */}
            <div className="relative animate-[fadeIn_1s_ease-out_0.3s_both]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-amber-400/20 rounded-3xl blur-2xl" />
              <img
                src="/images/hero-sign.png"
                alt="ポコポコ村の看板"
                className="relative w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-emerald-900/20 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-emerald-400 rounded-full animate-[scrollDown_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              ポコポコ村の魅力
            </h2>
            <p className="text-emerald-600 max-w-2xl mx-auto">
              心安らぐ自然の中で、特別な体験をお楽しみください
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-emerald-900">豊かな自然</CardTitle>
                <CardDescription className="text-emerald-600">
                  四季折々の美しい風景が広がります
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-700">
                  山々に囲まれた緑豊かな環境で、澄んだ空気と美しい星空をお楽しみいただけます。
                </p>
              </CardContent>
            </Card>

            <Card className="group border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-emerald-900">温かいおもてなし</CardTitle>
                <CardDescription className="text-emerald-600">
                  村人たちの心温まる歓迎
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-700">
                  昔ながらの温かいおもてなしで、訪れる皆様を家族のようにお迎えします。
                </p>
              </CardContent>
            </Card>

            <Card className="group border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-emerald-900">癒しの時間</CardTitle>
                <CardDescription className="text-emerald-600">
                  日常を忘れるひととき
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-700">
                  忙しい日常から離れ、のんびりとした時間の中で心と体をリフレッシュ。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ポコポコ村で特別な体験を
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-8 text-lg">
            自然の中で過ごす贅沢な時間が、あなたを待っています。
            今すぐ訪問を計画してみませんか？
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 text-lg px-8"
            >
              訪問を予約する
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8"
            >
              パンフレットをダウンロード
            </Button>
          </div>
        </div>
      </section>

      {/* 姉妹サイトセクション */}
      <section className="py-16 bg-gradient-to-r from-pink-50 via-white to-blue-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              オディンドの推し活サイト
            </h2>
            <p className="text-gray-600">
              村長オディンドがこっそり応援しているコンビ
            </p>
          </div>

          <a
            href="https://odindinpocopoco.com/jellybeans/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-2xl mx-auto group"
          >
            <Card className="border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-pink-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  {/* アイコン */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🫘</span>
                    </div>
                  </div>

                  {/* テキスト */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-1">
                      ジェリービーンズコレクション
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      北海道出身の男女お笑いコンビ
                    </p>
                    <p className="text-gray-600 text-sm">
                      あきはる & いじま のファンページ。ラジオ配信やYouTubeで活躍中！
                    </p>
                  </div>

                  {/* 矢印 */}
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-pink-400 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-emerald-900 text-emerald-100 py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="font-bold text-xl text-white">ポコポコ村</span>
              </div>
              <p className="text-emerald-300 max-w-sm">
                緑に囲まれた自然豊かな村で、心安らぐ時間をお過ごしください。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">リンク</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-emerald-300 hover:text-white transition-colors"
                  >
                    村について
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-emerald-300 hover:text-white transition-colors"
                  >
                    見どころ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-emerald-300 hover:text-white transition-colors"
                  >
                    アクセス
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-emerald-300 hover:text-white transition-colors"
                  >
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">お問い合わせ</h4>
              <ul className="space-y-2 text-emerald-300">
                <li>〒XXX-XXXX</li>
                <li>ポコポコ村 1-2-3</li>
                <li>TEL: 0XX-XXXX-XXXX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800 pt-8 text-center text-emerald-400 text-sm">
            <p>&copy; 2025 ポコポコ村. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* カスタムアニメーション用のスタイル */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scrollDown {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(6px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
