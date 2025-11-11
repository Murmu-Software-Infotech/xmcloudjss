import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-dev-tools';

export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'Products',
    displayName: 'Products',
    // 👇 Sitecore fields for content authors or static data
    fields: [
      {
        name: 'title',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Section Title',
      },
      {
        name: 'description',
        type: CommonFieldTypes.RichText,
        displayName: 'Short Description',
      },
    ],
  });
}
