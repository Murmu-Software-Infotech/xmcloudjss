import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-dev-tools';

export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'DemoPara',
    displayName: 'DempParac',
    icon: 'Applications/16x16/star.png',
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      {
        name: 'menuItems',
        type: CommonFieldTypes.ContentList, // 👈 Important: List field
        displayName: 'Menu Items',
      },
    ],
  });
}

