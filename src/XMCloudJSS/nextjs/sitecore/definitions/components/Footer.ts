import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Footer component to the disconnected manifest.
 * This function is invoked by convention (*.ts files) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest: Manifest): void {
  // Add template for blog post items
  manifest.addTemplate({
    name: 'BlogPost',
    displayName: 'Blog Post',
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'date', type: CommonFieldTypes.Date },
      { name: 'image', type: CommonFieldTypes.Image },
      { name: 'url', type: CommonFieldTypes.GeneralLink }
    ],
  });

  // Add template for quick links
  manifest.addTemplate({
    name: 'QuickLink',
    displayName: 'Quick Link',
    fields: [
      { name: 'linkText', type: CommonFieldTypes.SingleLineText },
      { name: 'linkUrl', type: CommonFieldTypes.GeneralLink }
    ],
  });

  manifest.addComponent({
    name: 'Footer',
    displayName: 'Footer',
    icon: SitecoreIcon.DocumentTag,
    allowedPlaceholders: ['jss-main'],
    fields: [
      {
        name: 'quickLinksTitle',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'quickLinks',
        type: CommonFieldTypes.ContentList,
      },
      {
        name: 'contactTitle',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'phone',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'email',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'address1',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'address2',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'latestBlogTitle',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'blogPosts',
        type: CommonFieldTypes.ContentList,
      }
    ],
  });
}