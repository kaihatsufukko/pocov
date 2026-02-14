import { Heart, Radio, Mic, Youtube } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface Member {
  id: number;
  name: string;
  realName: string;
  role: string;
  birthDate: string;
  birthPlace: string;
  height: string;
  weight: string;
  bloodType: string;
  description: string;
  specialty: string;
  image: string;
}

interface RadioReview {
  id: number;
  title: string;
  date: string;
  content: string;
  rating: number;
  author: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "あきはる",
    realName: "牛嶋 暁春（うしじま あきはる）",
    role: "女性",
    birthDate: "1980年12月11日（45歳）",
    birthPlace: "北海道苫小牧市",
    height: "148cm",
    weight: "48kg",
    bloodType: "A型",
    description:
      "ジェリービーンズコレクションのメンバー。明るく元気なキャラクターで、観客を笑顔にします。ラジオでも自由奔放なトークで番組を盛り上げています。2015年に一般会社員と結婚し、出産しました。",
    specialty: "ドライブ、散歩、北海道観光案内",
    image: "/images/akiharu-illustration.png",
  },
  {
    id: 2,
    name: "いじま",
    realName: "井島 靖彰（いじま やすあき）",
    role: "男性",
    birthDate: "1984年8月28日（41歳）",
    birthPlace: "北海道北広島市",
    height: "162cm",
    weight: "53kg",
    bloodType: "A型",
    description:
      "ジェリービーンズコレクションのメンバー。知識豊富で、ラジオではためになる話題も提供します。兄はプロ格闘家の井島裕彰。",
    specialty: "散歩",
    image: "/images/ijima-illustration.png",
  },
];

const radioReviews: RadioReview[] = [
  {
    id: 1,
    title: "最高に面白かった回！",
    date: "2025年12月15日",
    content:
      "ジェリービーンズコレクションのラジオは本当に面白いです。毎週楽しみにしています。このエピソードは特に笑いました！メンバーの掛け合いが最高です。",
    rating: 5,
    author: "ファン太郎",
  },
  {
    id: 2,
    title: "ラジオで元気をもらってます",
    date: "2025年12月10日",
    content:
      "毎日仕事が大変ですが、ジェリービーンズコレクションのラジオを聴くと元気が出ます。二人の掛け合いが最高です。これからも応援しています！",
    rating: 5,
    author: "リスナー花子",
  },
  {
    id: 3,
    title: "笑いが止まりませんでした",
    date: "2025年12月05日",
    content:
      "先週のエピソードはホントに面白かった。あきはるのボケとツッコミの絶妙なタイミングが最高です。次の放送も楽しみです。",
    rating: 4,
    author: "ジェリーファン",
  },
];

export default function JellyBeans() {
  const [, setLocation] = useLocation();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newReview, setNewReview] = useState({
    title: "",
    content: "",
    rating: 5,
    author: "",
  });
  const [reviews, setReviews] = useState(radioReviews);

  const handleAddReview = () => {
    if (newReview.title && newReview.content && newReview.author) {
      setReviews([
        ...reviews,
        {
          id: reviews.length + 1,
          ...newReview,
          date: new Date().toLocaleDateString("ja-JP"),
        },
      ]);
      setNewReview({ title: "", content: "", rating: 5, author: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50">
      <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-pink-400">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/images/jbc-logo.png" alt="JBC Logo" className="w-12 h-12" />
            <span className="text-sm font-bold text-gray-700">
              ジェリービーンズコレクション
            </span>
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="font-bold text-pink-600 hover:bg-pink-100"
              onClick={() => {
                document
                  .getElementById("members")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              メンバー
            </Button>
            <Button
              variant="ghost"
              className="font-bold text-blue-600 hover:bg-blue-100"
              onClick={() => setLocation("/jellybeans/radio-diary")}
            >
              ラジオ感想
            </Button>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* 背景装飾 - 浮遊する泡 */}
        <div className="absolute top-10 left-5 w-40 h-40 bg-pink-300 rounded-full opacity-20 animate-bubble"></div>
        <div className="absolute top-32 right-8 w-32 h-32 bg-blue-300 rounded-full opacity-25 animate-bubble" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-yellow-200 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-36 h-36 bg-green-300 rounded-full opacity-20 animate-bubble" style={{ animationDelay: "2s" }}></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center">
            {/* ジェリービーンズ装飾 - 上 */}
            <div className="flex justify-center gap-1 mb-6 flex-wrap">
              {['/images/jelly-yellow-pixel.png', '/images/jelly-pink-pixel.png', '/images/jelly-cyan-pixel.png', '/images/jelly-green-pixel.png', '/images/jelly-yellow-pixel.png', '/images/jelly-pink-pixel.png', '/images/jelly-cyan-pixel.png', '/images/jelly-green-pixel.png', '/images/jelly-yellow-pixel.png', '/images/jelly-pink-pixel.png', '/images/jelly-cyan-pixel.png', '/images/jelly-green-pixel.png', '/images/jelly-yellow-pixel.png', '/images/jelly-pink-pixel.png', '/images/jelly-cyan-pixel.png', '/images/jelly-green-pixel.png'].map((img, i) => (
                <img
                  key={`top-${i}`}
                  src={img}
                  alt="jelly"
                  className={`w-6 h-5 ${i % 2 === 0 ? "animate-jelly-blink" : "animate-jelly-blink-fast"}`}
                  style={{
                    animationDelay: `${Math.random() * 0.6}s`,
                  }}
                />
              ))}
            </div>

            {/* タイトルと右側の装飾 */}
            <div className="flex justify-center items-center mb-6">
              {/* タイトル画像 */}
              <img src="/images/jellybeans-title.png" alt="ジェリービーンズコレクション" className="max-w-full h-auto" />
            </div>

            {/* ジェリービーンズ装飾 - 下 */}
            <div className="flex justify-center gap-1 mb-6 flex-wrap">
              {['/images/jelly-yellow-pixel.png', '/images/jelly-pink-pixel.png', '/images/jelly-cyan-pixel.png', '/images/jelly-green-pixel.png', '/images/jelly-yellow-pixel.png', '/images/jelly-pink-pixel.png', '/images/jelly-cyan-pixel.png', '/images/jelly-green-pixel.png', '/images/jelly-yellow-pixel.png', '/images/jelly-pink-pixel.png', '/images/jelly-cyan-pixel.png', '/images/jelly-green-pixel.png', '/images/jelly-yellow-pixel.png', '/images/jelly-pink-pixel.png', '/images/jelly-cyan-pixel.png', '/images/jelly-green-pixel.png'].map((img, i) => (
                <img
                  key={`bottom-${i}`}
                  src={img}
                  alt="jelly"
                  className={`w-6 h-5 ${i % 2 === 0 ? "animate-jelly-blink" : "animate-jelly-blink-fast"}`}
                  style={{
                    animationDelay: `${Math.random() * 0.6}s`,
                  }}
                />
              ))}
            </div>

            {/* SNS・ラジオアイコン */}
            <div className="flex justify-center gap-6 mb-10 flex-wrap">
              <a href="https://stand.fm/channels/638ff742df23c21009a836e7" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all" title="Stand FM">
                <Radio className="w-10 h-10 text-orange-500" />
              </a>
              <a href="https://radiotalk.jp/program/135800" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all" title="Radio Talk">
                <Mic className="w-10 h-10 text-pink-500" />
              </a>
              <a href="https://x.com/jbcizima?s=21&t=WHBiZHBiwtmEuO2I2kzHaQ" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all" title="X - いじま">
                <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">X</span>
                </div>
              </a>
              <a href="https://x.com/jbcakiharu?s=21&t=WHBiZHBiwtmEuO2I2kzHaQ" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all" title="X - あきはる">
                <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">X</span>
                </div>
              </a>
              <a href="https://www.youtube.com/@jb.c" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all" title="YouTube">
                <Youtube className="w-10 h-10 text-red-600" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* コンビ紹介 */}
      <section id="members" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            コンビ紹介
          </h2>

          {/* コンビ紹介画像 */}
          <div className="mb-12 flex justify-center">
            <img src="/images/combo-illustration.png" alt="ジェリービーンズコレクション" className="max-w-2xl w-full rounded-3xl shadow-lg" />
          </div>

          {/* コンビ情報 */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              ジェリービーンズコレクションは、吉本興業所属（専属エージェント笄約）の北海道出身の男女お笑いコンビ。
            </p>

            {/* メンバー情報 */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-2xl font-black text-pink-600 mb-3">あきはる</h3>
                <p className="text-gray-700 font-bold mb-2">女性</p>
                <p className="text-gray-600">豆腐は木綿派。</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-2xl font-black text-blue-600 mb-3">いじま</h3>
                <p className="text-gray-700 font-bold mb-2">男性</p>
                <p className="text-gray-600">豆腐は絹派。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メンバー詳細モーダル */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-4xl font-black text-pink-600 mb-4">
              {selectedMember.name}
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-bold">本名:</span> {selectedMember.realName}
              </p>
              <p>
                <span className="font-bold">性別:</span> {selectedMember.role}
              </p>
              <p>
                <span className="font-bold">生年月日:</span>{" "}
                {selectedMember.birthDate}
              </p>
              <p>
                <span className="font-bold">出身地:</span>{" "}
                {selectedMember.birthPlace}
              </p>
              <p>
                <span className="font-bold">身長:</span> {selectedMember.height}
              </p>
              <p>
                <span className="font-bold">体重:</span> {selectedMember.weight}
              </p>
              <p>
                <span className="font-bold">血液型:</span>{" "}
                {selectedMember.bloodType}
              </p>
              <p>
                <span className="font-bold">特技:</span>{" "}
                {selectedMember.specialty}
              </p>
              <p className="pt-4">{selectedMember.description}</p>
            </div>
            <button
              onClick={() => setSelectedMember(null)}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-full hover:opacity-90 transition-all"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img src="/images/jelly-footer.png" alt="jelly" className="w-8 h-8" />
            <p className="text-lg font-bold">
              ジェリービーンズコレクション 推し活サイト
            </p>
            <img src="/images/jelly-footer.png" alt="jelly" className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-90">
            &copy; 2025 Jellybeans Collection Fan Page. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
