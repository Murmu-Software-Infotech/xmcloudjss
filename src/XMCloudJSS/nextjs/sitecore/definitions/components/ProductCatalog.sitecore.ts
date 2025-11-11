import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the ProductCatalog component to the disconnected manifest.
 * This reusable component showcases SXA patterns with filtering,
 * pagination, and external data integration.
 * 
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function ProductCatalog(manifest: Manifest): void {
  manifest.addComponent({
    name: 'ProductCatalog',
    displayName: 'Product Catalog',
    icon: SitecoreIcon.WindowDialog,
    fields: [
      {
        name: 'heading',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Heading',
        required: true,
        standardValue: 'Our Products'
      },
      {
        name: 'description',
        type: CommonFieldTypes.MultiLineText,
        displayName: 'Description',
        standardValue: 'Browse our complete product catalog'
      },
      {
        name: 'itemsPerPage',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Items Per Page',
        standardValue: '6'
      },
      {
        name: 'showFilters',
        type: CommonFieldTypes.Checkbox,
        displayName: 'Show Filter Sidebar',
        standardValue: 'true'
      },
      {
        name: 'showRatings',
        type: CommonFieldTypes.Checkbox,
        displayName: 'Show Product Ratings',
        standardValue: 'true'
      }
    ],
    allowedPlaceholders: ['jss-main']
  });
}

