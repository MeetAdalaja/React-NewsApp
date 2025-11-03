# React NewsApp — Modern News Reader (React)

A fast, responsive **news reader** built with **React**. Browse headlines by category,
search across sources, and read full articles in a clean, distraction‑free UI.
Supports client‑side routing, loading states, and optional infinite scroll.

[![Last commit](https://img.shields.io/github/last-commit/MeetAdalaja/React-NewsApp)](https://github.com/MeetAdalaja/React-NewsApp/commits/main)
[![Repo size](https://img.shields.io/github/repo-size/MeetAdalaja/React-NewsApp)](https://github.com/MeetAdalaja/React-NewsApp)
[![Open issues](https://img.shields.io/github/issues/MeetAdalaja/React-NewsApp)](https://github.com/MeetAdalaja/React-NewsApp/issues)
![Built with](https://img.shields.io/badge/built%20with-React-61DAFB)

---

## ✨ Features

- 🗞️ **Top headlines** by category (business, entertainment, health, science, sports, technology)
- 🔎 **Search** articles across sources
- ♾️ **Pagination / Infinite scroll** (configurable)
- 🌓 **Light/Dark mode** (optional)
- ⏳ **Skeleton loaders** and error states
- 🔗 **Open original** articles in a new tab
- 📱 **Responsive** layout (mobile → desktop)

> Your repository may include a subset of these features; remove any you don’t use.

---

## 🖥️ Live Demo

> Add your deployment URL here once live (Vercel/Netlify/GitHub Pages).

---

## 🗂️ Project Structure (typical)

```text
React-NewsApp/
├─ public/                     # static assets
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx           # nav + theme toggle + search
│  │  ├─ ArticleCard.jsx      # single article item
│  │  ├─ ArticleList.jsx      # list + infinite scroll/pagination
│  │  └─ Loader.jsx           # spinners/skeletons
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  └─ Category.jsx         # per-category route
│  ├─ hooks/                  # custom hooks (e.g., useNews)
│  ├─ services/api.js         # API client (fetch wrapper)
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx / index.js
├─ package.json
└─ README.md
```

> Your file names may differ (e.g., `App.js`, `index.js`). Adjust imports accordingly.

---

## 🔑 API & Environment Variables

This app typically integrates with a news API (e.g., **NewsAPI.org**). Create a **.env** in the repo root:

For **Vite** projects:
```ini
VITE_NEWS_API_KEY=your_api_key_here
VITE_NEWS_API_BASE=https://newsapi.org/v2
```

For **Create React App** projects:
```ini
REACT_APP_NEWS_API_KEY=your_api_key_here
REACT_APP_NEWS_API_BASE=https://newsapi.org/v2
```

> ⚠️ **Important:** Some news providers (including NewsAPI.org) restrict **client-side** usage in production
> to avoid exposing API keys and due to CORS. For production, use a small **proxy/serverless function**
> that injects the key server‑side. (See **Production Proxy** below.)

### Common endpoints (NewsAPI)
- `GET /top-headlines?country=ca&category=technology&page=1&pageSize=20`
- `GET /everything?q=canada+tech&sortBy=publishedAt&page=1&pageSize=20`

---

## ⚙️ Local Development

### 1) Clone & install
```bash
git clone https://github.com/MeetAdalaja/React-NewsApp.git
cd React-NewsApp
npm install    # or: yarn
```

### 2) Run the dev server
```bash
# Vite projects:
npm run dev

# Create React App projects:
npm start
```

### 3) Build for production
```bash
npm run build
# Vite preview (optional)
npm run preview
```

> Check `package.json` scripts to confirm whether the project uses **Vite** or **CRA**.

---

## 🛰️ Production Proxy (recommended)

Because many news APIs disallow client‑side keys, deploy a tiny proxy. Example (Node/Express):

```js
// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8787;
const API_BASE = "https://newsapi.org/v2";
const API_KEY = process.env.NEWS_API_KEY; // set in your host's env

app.get("/api/*", async (req, res) => {
  try {
    const upstream = `${API_BASE}${req.path.replace(/^\/api/, "")}?${new URLSearchParams({
      ...req.query,
      apiKey: API_KEY
    })}`;
    const r = await fetch(upstream);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "proxy_failed" });
  }
});

app.listen(PORT, () => console.log(`proxy on :${PORT}`));
```

Then set your frontend base URL to the proxy origin (e.g., `https://your-proxy.example.com/api`).

**Serverless alternatives:** Netlify Functions, Vercel Serverless, Cloudflare Workers.

---

## ☁️ Deployment

**Vercel/Netlify (recommended)**
1. Import the GitHub repo
2. Build command: `npm run build`
3. Output dir:
   - Vite → `dist`
   - CRA → `build`
4. Set env vars (proxy URL or API key) in project settings

**GitHub Pages (Vite)**
```js
// vite.config.js
export default { base: "/React-NewsApp/" }
```
Then:
```bash
npm run build
# deploy /dist to gh-pages
```

---

## 🧭 Roadmap

- [ ] Add **source filters** and **country/region** selector
- [ ] Add **bookmarking** (localStorage) and a **bookmarks page**
- [ ] **Offline**/PWA shell for cached reading
- [ ] **Accessibility** pass (ARIA roles, focus management)
- [ ] Unit tests for API helpers and reducers

---

## 🐞 Troubleshooting

- **CORS/401 errors:** use a proxy in production; double‑check API key and referer restrictions
- **Rate limiting:** reduce `pageSize`, add debounced search, or implement caching on the proxy
- **Build fails:** clear `node_modules` + lockfile and reinstall (`npm ci` / `npm install`)

---

## 📄 License

If you intend to open‑source this project, add a `LICENSE` file (e.g., MIT).  
Without a license, the default is **all rights reserved**.

---

## 🙏 Acknowledgements

- Thanks to public news APIs and open‑source maintainers
- Built with **React**; deployable on any static host + optional serverless proxy
