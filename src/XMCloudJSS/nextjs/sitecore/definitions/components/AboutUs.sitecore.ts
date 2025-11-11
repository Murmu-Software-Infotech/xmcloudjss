// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the AboutUs component to the disconnected manifest.
 * This function is invoked by convention (*.ts files) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'AboutUs',
    displayName: 'About Us Section',
    icon: SitecoreIcon.DocumentTag,
    allowedPlaceholders: ['jss-main'],
    fields: [
      {
        name: 'title',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'heading',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'subheading',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'content',
        type: CommonFieldTypes.RichText,
      },
      {
        name: 'image',
        type: CommonFieldTypes.Image,
      },
      {
        name: 'features',
        type: CommonFieldTypes.ContentList,
        source: '/AboutUs/features',
      },
    ],
  });
}