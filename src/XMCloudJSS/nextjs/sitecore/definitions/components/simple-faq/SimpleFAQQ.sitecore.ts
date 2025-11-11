import {
  CommonFieldTypes,
  SitecoreIcon,
  Manifest,
} from '@sitecore-jss/sitecore-jss-dev-tools';
import fs from 'fs';
import path from 'path';

const query = fs.readFileSync(
  path.resolve(__dirname, 'SimpleFAQQ.sitecore.graphql'),
  'utf8'
);

export default function SimpleFAQQ(manifest: Manifest): void {
  manifest.addComponent({
    name: 'SimpleFAQQ',
    templateName: 'SimpleFAQQ',
    icon: SitecoreIcon.Question,
    graphQLQuery: query,
    fields: [
      { name: 'question', type: CommonFieldTypes.SingleLineText },
      { name: 'answer', type: CommonFieldTypes.RichText },
    ],
  });

//   manifest.addTemplate({
//     name: 'SimpleFAQQ',
//     fields: [
//       { name: 'question', type: CommonFieldTypes.SingleLineText },
//       { name: 'answer', type: CommonFieldTypes.RichText },
//     ],
//   });
}
