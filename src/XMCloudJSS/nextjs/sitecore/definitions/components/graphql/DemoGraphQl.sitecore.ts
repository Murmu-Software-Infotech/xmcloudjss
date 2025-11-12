import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import fs from 'fs';

const query = fs.readFileSync(
  'sitecore/definitions/components/graphql/DemoGraphQl.sitecore.graphql',
  'utf8'
);

/**
 * Adds the GraphQL-IntegratedDemo component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function DemoGraphQl(manifest: Manifest): void {
  manifest.addComponent({
    name: 'DemoGraphQl',
    templateName: 'DemoGraphQl',
    icon: SitecoreIcon.GraphConnection_directed,
    graphQLQuery: query,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'content', type: CommonFieldTypes.GeneralLink },
      { name: 'data', type: CommonFieldTypes.RichText },
    ],
  });
}
