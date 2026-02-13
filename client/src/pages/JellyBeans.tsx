import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function JellyBeans() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* ナビゲーション */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🫘</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              ジェリービーンズコレクション
            </span>
          </button>
          <Button
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50"
            onClick={() => setLocation("/")}
          >
            ポコポコ村に戻る
          </Button>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            北海道出身の男女お笑いコンビ
          </div>
          <div className="text-6xl md:text-8xl mb-4">🫘</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              ジェリービーンズ
            </span>
            <br />
            <span className="text-gray-800 text-3xl md:text-4xl">
              コレクション
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            あきはる & いじま のファンページ。
            <br />
            ラジオ配信やYouTubeで活躍中！
          </p>
        </div>
      </section>

      {/* メンバー紹介 */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              メンバー
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">🎤</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  あきはる
                </h3>
                <p className="text-gray-600">
                  ジェリービーンズのメンバー
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">🎤</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  いじま
                </h3>
                <p className="text-gray-600">
                  ジェリービーンズのメンバー
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gradient-to-r from-pink-900 to-purple-900 text-pink-100 py-12">
        <div className="container text-center">
          <p className="text-pink-300 mb-4">
            村長オディンドがこっそり応援しているファンサイトです
          </p>
          <button
            onClick={() => setLocation("/")}
            className="text-pink-200 hover:text-white transition-colors underline"
          >
            ポコポコ村トップへ戻る
          </button>
          <p className="mt-8 text-pink-400 text-sm">
            &copy; 2025 ポコポコ村. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
