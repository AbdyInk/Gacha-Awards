const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://gachaawards.com' });

  const writeStream = createWriteStream(resolve(__dirname, 'public/sitemap.xml'));
  const pipeline = sitemap.pipe(writeStream);

  // Añade las rutas de tu sitio web aquí
  sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 });
  sitemap.write({ url: '/results', changefreq: 'weekly', priority: 0.8 });
  // Añade más rutas según sea necesario

  sitemap.end();

  await streamToPromise(pipeline);
  console.log('Sitemap generado correctamente en public/sitemap.xml');
}

generateSitemap().catch(console.error);