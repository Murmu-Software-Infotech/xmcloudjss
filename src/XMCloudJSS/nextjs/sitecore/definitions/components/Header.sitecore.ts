import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

export default function Header(manifest: Manifest) {
  manifest.addComponent({
    name: 'Header',
    displayName: 'Header',
    icon: SitecoreIcon.DocumentTag,
    allowedPlaceholders: ['jss-header'],
    fields: [
      {
        name: 'logo',
        type: CommonFieldTypes.Image,
        displayName: 'Logo',
      },
      {
        name: 'title',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Title',
      },
      {
        name: 'links',
        type: CommonFieldTypes.ContentList,
        displayName: 'Navigation Links',
        source: 'dataSource=/sitecore/content/Navigation',
      },
    ],
  });

  manifest.addTemplate({
    name: 'NavigationLink',
    displayName: 'Navigation Link',
    fields: [
      {
        name: 'link',
        type: CommonFieldTypes.GeneralLink,
        displayName: 'Link',
      },
      {
        name: 'submenu',
        type: CommonFieldTypes.ContentList,
        displayName: 'Submenu Items',
        source: '/sitecore/content/Navigation',
      },
    ],
  });
}