// Local static server for the site. Usage: node serve.mjs [port] [dir]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const here = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.argv[2]) || 3000;
const root = resolve(here, process.argv[3] || "site");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".mp4": "video/mp4", ".woff2": "font/woff2", ".pdf": "application/pdf", ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml" };

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = join(root, normalize(p));
    if (!file.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
    const s = await stat(file);
    const type = types[extname(file).toLowerCase()] || "application/octet-stream";
    const range = req.headers.range;
    if (range && type === "video/mp4") {
      const [a, b] = range.replace(/bytes=/, "").split("-");
      const start = parseInt(a, 10), end = b ? parseInt(b, 10) : s.size - 1;
      const { createReadStream } = await import("node:fs");
      res.writeHead(206, { "Content-Range": `bytes ${start}-${end}/${s.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1, "Content-Type": type });
      createReadStream(file, { start, end }).pipe(res); return;
    }
    let buf = await readFile(file);
    const headers = { "Content-Type": type, "Cache-Control": "no-store" };
    if (/^(text|application\/(json|xml))|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] || "")) { buf = gzipSync(buf); headers["Content-Encoding"] = "gzip"; }
    headers["Content-Length"] = buf.length;
    res.writeHead(200, headers);
    res.end(buf);
  } catch { res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found"); }
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
