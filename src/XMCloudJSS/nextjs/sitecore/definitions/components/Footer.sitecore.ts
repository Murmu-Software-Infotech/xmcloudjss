import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Footer component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts files) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function FooterManifest(manifest: Manifest): void {
  // Add template for Quick Links
  manifest.addTemplate({
    name: 'QuickLink',
    displayName: 'Quick Link',
    fields: [
      { 
        name: 'linkText', 
        displayName: 'Link Text',
        type: CommonFieldTypes.SingleLineText 
      },
      { 
        name: 'linkUrl', 
        displayName: 'Link URL',
        type: CommonFieldTypes.GeneralLink 
      }
    ],
  });

  // Add template for Blog Posts
  manifest.addTemplate({
    name: 'BlogPost',
    displayName: 'Blog Post',
    fields: [
      { 
        name: 'title', 
        displayName: 'Title',
        type: CommonFieldTypes.SingleLineText 
      },
      { 
        name: 'date', 
        displayName: 'Date',
        type: CommonFieldTypes.Date 
      },
      { 
        name: 'image', 
        displayName: 'Image',
        type: CommonFieldTypes.Image 
      },
      { 
        name: 'excerpt', 
        displayName: 'Excerpt',
        type: CommonFieldTypes.SingleLineText 
      }
    ],
  });

  // Add Footer component
  manifest.addComponent({
    name: 'Footer',
    displayName: 'Footer',
    icon: SitecoreIcon.DocumentTag,
    allowedPlaceholders: ['jss-main', 'jss-footer'],
    fields: [
      {
        name: 'quickLinksTitle',
        displayName: 'Quick Links Title',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'quickLinks',
        displayName: 'Quick Links',
        type: CommonFieldTypes.ContentList,
      },
      {
        name: 'contactTitle',
        displayName: 'Contact Title',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'phone',
        displayName: 'Phone Number',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'email',
        displayName: 'Email Address',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'address1',
        displayName: 'Address Line 1',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'address2',
        displayName: 'Address Line 2',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'latestBlogTitle',
        displayName: 'Latest Blog Title',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'blogPosts',
        displayName: 'Blog Posts',
        type: CommonFieldTypes.ContentList,
      }
    ],
  });
}