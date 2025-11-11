import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the ProductDetail component to the disconnected manifest.
 * This component displays detailed information about a single product
 * including personalized recommendations.
 * 
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function ProductDetail(manifest: Manifest): void {
  manifest.addComponent({
    name: 'ProductDetail',
    displayName: 'Product Detail',
    icon: SitecoreIcon.WindowDialog,
    fields: [
      {
        name: 'title',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Page Title',
        required: false
      },
      {
        name: 'showRecommendations',
        type: CommonFieldTypes.Checkbox,
        displayName: 'Show Personalized Recommendations',
        standardValue: 'true'
      }
    ],
    allowedPlaceholders: ['jss-main']
  });
}

