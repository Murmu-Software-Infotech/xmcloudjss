import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the ContactForm component to the disconnected manifest.
 * This function is invoked by convention (*.ts files) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'ContactForm',
    displayName: 'Contact Form',
    icon: SitecoreIcon.UserMessage,
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
        name: 'buttonText',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Button Text'
      },
      {
        name: 'namePlaceholder',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Name Field Placeholder'
      },
      {
        name: 'emailPlaceholder',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Email Field Placeholder'
      },
      {
        name: 'subjectPlaceholder',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Subject Field Placeholder'
      },
      {
        name: 'messagePlaceholder',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Message Field Placeholder'
      },
      {
        name: 'mapLocation',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'Map Location URL'
      }
    ],
  });
}