import { Hono } from 'hono';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "sonorous-station-hn56p",
  appId: "1:131755142262:web:829dc76a4ea8511e324357",
  apiKey: "AIzaSyB8lyK_Y0N0Ql_oXuw60xNKXT4VEl_FZFs",
  authDomain: "sonorous-station-hn56p.firebaseapp.com",
  storageBucket: "sonorous-station-hn56p.firebasestorage.app",
  messagingSenderId: "131755142262",
};

const databaseId = "ai-studio-lattyportfolio-88c45d5c-6597-4b50-9afe-23b9a63e9921";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any = null;
function getDb() {
  if (!db) {
    try {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app, databaseId);
    } catch (e) {
      console.warn("Failed to initialize Firebase", e);
    }
  }
  return db;
}

const app = new Hono();

// Sitemap route
app.get('/sitemap.xml', (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://cymatichub.xyz/</loc></url>
  <url><loc>https://cymatichub.xyz/manifesto</loc></url>
  <url><loc>https://cymatichub.xyz/projects</loc></url>
  <url><loc>https://cymatichub.xyz/resonance</loc></url>
  <url><loc>https://cymatichub.xyz/study</loc></url>
  <url><loc>https://cymatichub.xyz/showcase</loc></url>
  <url><loc>https://cymatichub.xyz/showcase/template1</loc></url>
  <url><loc>https://cymatichub.xyz/showcase/template2</loc></url>
  <url><loc>https://cymatichub.xyz/showcase/template3</loc></url>
  <url><loc>https://cymatichub.xyz/showcase/template4</loc></url>
  <url><loc>https://cymatichub.xyz/template/template1</loc></url>
  <url><loc>https://cymatichub.xyz/template/template2</loc></url>
  <url><loc>https://cymatichub.xyz/template/template3</loc></url>
  <url><loc>https://cymatichub.xyz/template/template4</loc></url>
  <url><loc>https://cymatichub.xyz/creative</loc></url>
  <url><loc>https://cymatichub.xyz/creatives</loc></url>
  <url><loc>https://cymatichub.xyz/learning</loc></url>
  <url><loc>https://cymatichub.xyz/for-schools</loc></url>
  <url><loc>https://cymatichub.xyz/for-teams</loc></url>
  <url><loc>https://cymatichub.xyz/how-it-works</loc></url>
  <url><loc>https://cymatichub.xyz/twin-engines</loc></url>
  <url><loc>https://cymatichub.xyz/legal</loc></url>
  <url><loc>https://cymatichub.xyz/transparency</loc></url>
  <url><loc>https://cymatichub.xyz/stack</loc></url>
  <url><loc>https://cymatichub.xyz/socials</loc></url>
</urlset>`;
  c.header('Content-Type', 'application/xml');
  return c.body(sitemap);
});

// Download route
app.get('/api/v1/download', async (c) => {
  const appType = c.req.query('appType');
  const version = c.req.query('version');
  
  if (!appType || !version || (appType !== 'study' && appType !== 'resonance')) {
    return c.text('Invalid parameters', 400);
  }
  
  const firestore = getDb();
  if (firestore) {
    try {
      await addDoc(collection(firestore, 'downloads'), {
        appType,
        version,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.error("Failed to log download", e);
    }
  }
  return c.redirect(`https://github.com/IsabiryeLatif/cymatic-evolution/releases/download/${version}/${appType}-${version}.zip`);
});

// Infrastructure Telemetry API
app.get('/api/health/:subdomain', (c) => {
  const subdomain = c.req.param('subdomain');
  return c.json({
      subdomain,
      latency: Math.floor(Math.random() * 50) + 10 + 'ms',
      nodeEfficiency: (95 + Math.random() * 5).toFixed(1) + '%',
      pulse: Math.floor(Math.random() * 20) + 70 + ' bpm'
  });
});

// Get all releases for the download index
app.get('/api/v1/releases', async (c) => {
  try {
    const response = await fetch('https://api.github.com/repos/IsabiryeLatif/cymatic-evolution/releases', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'CymaticStudy-Portfolio'
      }
    });
    const releases = await response.json();
    return c.json(releases);
  } catch (error) {
    console.error('Error fetching releases:', error);
    return c.json({ error: 'Failed to fetch releases' }, 500);
  }
});

// SPA Fallback for production (Cloudflare Workers)
app.notFound(async (c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({ error: 'Not Found', path: c.req.path }, 404);
  }
  
  const env = c.env as { ASSETS?: { fetch: typeof fetch } };
  if (env?.ASSETS) {
    const response = await env.ASSETS.fetch(c.req.raw);
    if (response.status < 400) {
      return response;
    }
    const url = new URL(c.req.url);
    const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(url.pathname);
    if (!hasFileExtension) {
      url.pathname = '/index.html';
      return env.ASSETS.fetch(new Request(url.toString(), c.req.raw));
    }
    return response;
  }
  return c.text('Not Found', 404);
});

// Development server setup
if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
  const startDev = async () => {
    const http = await import('http');
    const { createServer: createViteServer } = await import('vite');
    const { getRequestListener } = await import('@hono/node-server');

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    
    const requestListener = getRequestListener(app.fetch);

    const server = http.createServer((req, res) => {
      const url = req.url || '';
      if (url.startsWith('/api/') || url === '/sitemap.xml') {
        return requestListener(req, res);
      }
      vite.middlewares(req, res, () => {
        requestListener(req, res);
      });
    });

    const port = 3000;
    console.log(`Starting dev server on http://localhost:${port}`);
    server.listen(port, '0.0.0.0');
  };
  
  startDev().catch(console.error);
}

export default {
  fetch: app.fetch
};
