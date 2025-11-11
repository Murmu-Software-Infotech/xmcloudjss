import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Hero component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function Hero(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Hero',
    icon: SitecoreIcon.EmoticonSmile,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'subtitle', type: CommonFieldTypes.SingleLineText },
      { name: 'businessType', type: CommonFieldTypes.SingleLineText },
      { name: 'ctaText', type: CommonFieldTypes.SingleLineText },
      { name: 'ctaLink', type: CommonFieldTypes.GeneralLink }
    ],
  });
}