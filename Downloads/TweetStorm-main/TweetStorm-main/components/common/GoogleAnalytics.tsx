'use client';

import { GoogleAnalytics as GoogleAnalyticsLib } from '@next/third-parties/google';

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const isProduction = process.env.NODE_ENV === 'production';

  return isProduction ? <GoogleAnalyticsLib gaId={GA_ID!} /> : null;
}
