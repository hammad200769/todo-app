import { MetadataRoute } from 'next';

const HOST = `${process.env.PROTOCOL}://${process.env.DOMAIN}`;

export default function robots(): MetadataRoute.Robots {
  // TODO: disalow crawling in staging
  // if (ENVIRONMENT === 'staging') {
  //   return {
  //     rules: {
  //       userAgent: '*',
  //       disallow: '/',
  //     },
  //   };
  // }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [HOST + '/sitemap.xml', HOST + '/blog-sitemap.xml'],
  };
}
