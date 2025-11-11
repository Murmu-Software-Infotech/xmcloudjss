import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-dev-tools';
import fs from 'fs';

const query = fs.readFileSync(
  'sitecore/definitions/components/faq/FAQ.sitecore.graphql',
  'utf8'
);

export default function FAQ(manifest: Manifest): void {
  manifest.addComponent({
    name: 'FAQ',
    templateName: 'FAQ',
    fields: [
      { name: 'question', type: CommonFieldTypes.SingleLineText },
      { name: 'answer', type: CommonFieldTypes.RichText },
    ],
    graphQLQuery: query,   // ✅ this executes GraphQL
  });
}
