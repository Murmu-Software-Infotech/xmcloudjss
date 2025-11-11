import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Blog component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function Blog(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Blog',
    icon: SitecoreIcon.DocumentTag,
   
     graphQLQuery: 'graphql/Blog.sitecore.graphql',



    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'subheading', type: CommonFieldTypes.SingleLineText },
      {
        name: 'blogs',
        type: CommonFieldTypes.ContentList
      },
    ],
  });

  manifest.addTemplate({
    name: 'Blog-Item',
    fields: [
      { name: 'image', type: CommonFieldTypes.Image },
      { name: 'category', type: CommonFieldTypes.SingleLineText },
      { name: 'date', type: CommonFieldTypes.SingleLineText },
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'excerpt', type: CommonFieldTypes.RichText },
      { name: 'link', type: CommonFieldTypes.GeneralLink },
    ],
  });
}