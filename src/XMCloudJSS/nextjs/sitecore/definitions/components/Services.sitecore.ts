import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Services component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function Services(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Services',
    icon: SitecoreIcon.WindowDialog,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'subheading', type: CommonFieldTypes.SingleLineText },
      {
        name: 'services',
        type: CommonFieldTypes.ContentList
      },
    ],
  });

  manifest.addTemplate({
    name: 'Service-Item',
    fields: [
      { name: 'icon', type: CommonFieldTypes.SingleLineText },
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'link', type: CommonFieldTypes.GeneralLink },
    ],
  });
}