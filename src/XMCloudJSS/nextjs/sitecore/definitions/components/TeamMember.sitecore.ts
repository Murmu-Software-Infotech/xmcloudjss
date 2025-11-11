import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'TeamMember',
    displayName: 'Team Member',
    fields: [
      {
        name: 'name',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Name',
        required: true,
      },
      {
        name: 'role',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Role',
      },
      {
        name: 'bio',
        type: CommonFieldTypes.RichText,
        displayName: 'Biography',
      },
    ],
  });
}