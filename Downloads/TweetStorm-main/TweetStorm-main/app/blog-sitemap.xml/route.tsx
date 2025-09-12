// app/blogs-sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GHOST_CONTENT_API_KEY;
    const apiUrl = `${process.env.GHOST_API_URL}/ghost/api/content/posts/`;
    const url = `${apiUrl}?key=${apiKey}&limit=all`;

    const res = await fetch(url);
    const data = await res.json();

    const blogUrls = data.posts
      .map(
        (post: any) => `
    <url>
      <loc>https://tweetstorm.ai/blog/${post.slug}</loc>
      <lastmod>${post.updated_at}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
      )
      .join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${blogUrls}
  </urlset>`;

    return new NextResponse(sitemap, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
