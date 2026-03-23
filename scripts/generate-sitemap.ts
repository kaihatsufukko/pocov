/**
 * ビルド後にsitemap.xmlを生成するスクリプト。
 */
import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve(import.meta.dirname, "../dist/public");
const SITE_URL = "https://odindinpocopoco.com";

const pages = [
  { path: "/", changefreq: "monthly", priority: "0.5" },
  { path: "/jellybeans", changefreq: "weekly", priority: "0.9" },
  { path: "/jellybeans/radio-diary", changefreq: "weekly", priority: "0.8" },
  { path: "/music", changefreq: "monthly", priority: "0.5" },
  { path: "/radio", changefreq: "monthly", priority: "0.5" },
  { path: "/games", changefreq: "monthly", priority: "0.5" },
  { path: "/anime", changefreq: "monthly", priority: "0.5" },
];

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), sitemap, "utf-8");
console.log("sitemap.xml を生成しました。");
