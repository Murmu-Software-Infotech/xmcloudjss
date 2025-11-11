import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the GetInTouch component to the disconnected manifest.
 * This function is invoked by convention (*.ts files) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'GetInTouch',
    displayName: 'Get In Touch',
    icon: SitecoreIcon.PhonePick_up,
    allowedPlaceholders: ['jss-main'],
    fields: [
      {
        name: 'title',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Title'
      },
      {
        name: 'subtitle',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Subtitle'
      },
      {
        name: 'phone',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Phone Number'
      },
      {
        name: 'email',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Email Address'
      },
      {
        name: 'address1',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Address Line 1'
      },
      {
        name: 'address2',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Address Line 2'
      },
      {
        name: 'image',
        type: CommonFieldTypes.Image,
        displayName: 'Contact Image'
      }
    ],
  });
}