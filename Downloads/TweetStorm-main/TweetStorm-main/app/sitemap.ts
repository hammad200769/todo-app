import { getAbsoluteUrl } from '@/api-utils/utils';
import { URLS } from '@/utils/constants';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(URLS.publicTweetGeneration),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: getAbsoluteUrl(URLS.publicHashtagGeneration),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(URLS.publicBioGeneration),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(URLS.publicHandleGeneration),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(URLS.publicTweetSearch),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(URLS.privacyPolicy),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: getAbsoluteUrl(URLS.termsOfService),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: getAbsoluteUrl(URLS.login),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: getAbsoluteUrl(URLS.signup),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: getAbsoluteUrl(URLS.blog),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.pricing),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.tweetGeneratorExtension),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.massTweetDeletionExtension),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.massTweetDeletes),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.twitterAutoLiker),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.deleteTwitterLikes),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.massTwitterFollows),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.massTwitterUnfollows),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.massRetweets),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(URLS.videoDownloader),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
