import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

import Scripts from 'src/Scripts';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  pageTitle: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  console.log("Route", route);

  const fields = route?.fields as RouteFields;

  console.log("Fiels Condole", fields);

  return (
    <>
      <Scripts />
      
      <Head>
        <title>{fields.pageTitle.value.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </Head>

      {/* Header placeholder */}
      {route && <Placeholder name="jss-header" rendering={route} />}
      
      {/* root placeholder for the app, which we add components to using route data */}
      <div className="">
        {route && <Placeholder name="jss-main" rendering={route} />}
      </div>

      {route && <Placeholder name="jss-footer" rendering={route} />}
    </>
  );
};

export default Layout;
