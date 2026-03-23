/**
 * ビルド後に各ルートのHTMLファイルを生成するスクリプト。
 * SEO用に静的なテキストコンテンツをHTMLに埋め込む。
 */
import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve(import.meta.dirname, "../dist/public");
const BASE_HTML_PATH = path.join(DIST_DIR, "index.html");

interface PageConfig {
  route: string;
  title: string;
  description: string;
  ogUrl: string;
  staticContent: string;
}

const pages: PageConfig[] = [
  {
    route: "jellybeans/radio-diary",
    title:
      "ジェリービーンズ・コレクション（ジェリコレ）ラジオ日記 | いじま・あきはるファンページ",
    description:
      "吉本興業の男女お笑いコンビ、ジェリービーンズ・コレクション（ジェリコレ）のいじまとあきはるによるRadiotalkラジオ配信の感想・まとめページです。",
    ogUrl: "https://odindinpocopoco.com/jellybeans/radio-diary",
    staticContent: `
    <h1>ジェリービーンズ・コレクション ラジオ日記</h1>
    <h2>いじまとあきはるのRadiotalk配信まとめ</h2>
    <p>吉本興業の男女お笑いコンビ、ジェリービーンズ・コレクション（ジェリコレ）のいじまとあきはるによるRadiotalk・Stand FMラジオ配信の感想・まとめページです。</p>
    <article><h3>歯医者行かない芸人</h3><p>2026年3月16日 - Stand FM</p><p>歯医者に行かない芸人のうち、パンプキンポテトフライの谷拓哉さんだけは歯磨きが得意で虫歯が無いため、歯医者に行く必要が無いので行かないのです。30年以上生きて虫歯無いなんて信じられない。</p></article>
    <article><h3>カップ焼きそば</h3><p>2026年3月13日 - Radio Talk</p><p>日清焼きそばUFOを子供の頃から好きでしたが、ある時、味が変わって違う焼きそばになってしまいました。</p></article>
    <article><h3>方位学いろいろ</h3><p>2026年3月9日 - Stand FM</p><p>サムライ開運法は巻末にその日、どの方位がどの運気かを表した表が添付されています。</p></article>
    <article><h3>スタエフのエラー</h3><p>2026年2月13日 - Radio Talk</p><p>スタンドFMで収録後に、くるくる回ってフリーズしてしまった時の対処法。</p></article>
    <article><h3>札幌おすすめのお店</h3><p>2025年11月24日 - Stand FM</p><p>スープカレーのピカンティ、松尾ジンギスカン、焼きそば弁当など北海道のおすすめ。</p></article>
    <article><h3>鍵が二つ付いてるトイレ</h3><p>2025年11月7日 - Radio Talk</p><p>ショッピングモールのトイレに鍵が２つ付いてるトイレの話。</p></article>
    <nav><a href="/jellybeans">ジェリービーンズ・コレクション トップ</a> | <a href="/">ホーム</a></nav>
    `,
  },
  {
    route: "jellybeans",
    title:
      "ジェリービーンズ・コレクション（ジェリコレ）推し活サイト | いじま・あきはる",
    description:
      "吉本興業の男女お笑いコンビ、ジェリービーンズ・コレクション（ジェリコレ）のいじまとあきはるの推し活ファンページです。",
    ogUrl: "https://odindinpocopoco.com/jellybeans",
    staticContent: `
    <h1>ジェリービーンズ・コレクション 推し活サイト</h1>
    <h2>いじまとあきはる - 吉本興業の男女お笑いコンビ</h2>
    <p>ジェリービーンズ・コレクション（ジェリコレ）は、吉本興業所属の北海道出身の男女お笑いコンビです。</p>
    <section><h3>あきはる</h3><p>女性。牛嶋暁春（うしじまあきはる）。北海道苫小牧市出身。</p></section>
    <section><h3>いじま</h3><p>男性。井島靖彰（いじまやすあき）。北海道北広島市出身。</p></section>
    <nav><a href="/jellybeans/radio-diary">ジェリービーンズ・コレクション ラジオ日記</a> | <a href="/">ホーム</a></nav>
    `,
  },
];

function generatePages() {
  if (!fs.existsSync(BASE_HTML_PATH)) {
    console.error("ベースHTMLが見つかりません:", BASE_HTML_PATH);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(BASE_HTML_PATH, "utf-8");

  for (const page of pages) {
    let html = baseHtml;

    // タイトルを置換
    html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);

    // meta descriptionを置換
    html = html.replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${page.description}">`,
    );

    // og:urlを置換
    html = html.replace(
      /<meta property="og:url" content=".*?">/,
      `<meta property="og:url" content="${page.ogUrl}">`,
    );

    // og:titleを置換
    html = html.replace(
      /<meta property="og:title" content=".*?">/,
      `<meta property="og:title" content="${page.title}">`,
    );

    // noscriptコンテンツを<div id="root">の後に挿入
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <noscript>${page.staticContent}</noscript>`,
    );

    // ディレクトリを作成してHTMLを書き出し
    const outputDir = path.join(DIST_DIR, page.route);
    fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, "index.html");
    fs.writeFileSync(outputPath, html, "utf-8");
    console.log(`生成: ${outputPath}`);
  }

  console.log("静的ページの生成が完了しました。");
}

generatePages();
