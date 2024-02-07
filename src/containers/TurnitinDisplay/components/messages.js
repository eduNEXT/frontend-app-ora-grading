import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  fileNameTableHeader: {
    id: 'ora-grading.TurnitinDisplay.FileNameCell.fileNameTitle',
    defaultMessage: 'Responses',
    description: 'Title for files attached to the submission',
  },
  URLTableHeader: {
    id: 'ora-grading.TurnitinDisplay.FileNameCell.tableNameHeader',
    defaultMessage: 'URL',
    description: 'Title for the file name column in the table',
  },
  buttonViewerURLTitle: {
    id: 'ora-grading.TurnitinDisplay.ButtonCell.URLButtonCellTitle',
    defaultMessage: 'View in Turnitin',
    description: 'Title for the button that opens the viewer in a new tab',
  },
  similarityReportsTitle: {
    id: 'ora-grading.TurnitinDisplay.SimilarityReportsTitle',
    defaultMessage: 'Turnitin Similarity Reports',
    description: 'Title for the Turnitin Similarity Reports section',
  },
  noSimilarityReports: {
    id: 'ora-grading.TurnitinDisplay.NoSimilarityReports',
    defaultMessage: 'No Turnitin Similarity Reports to show',
    description: 'Message to display when there are no Turnitin Similarity Reports to show',
    },
  viewerURLExpired: {
    id: 'ora-grading.TurnitinDisplay.ViewerURLExpired',
    defaultMessage: 'The Similarity Report URLs have a very short lifespan (less than 1 minute) after which it will no longer be valid. Once a user has been redirected to this URL, they will be given a session that will last for 1 hour. When expired, please refresh the page to get a new URL.',
    description: 'Message to display when the viewer URL has expired',
  },
  viewerURLExpiredTitle: {
    id: 'ora-grading.TurnitinDisplay.ViewerURLExpiredTitle',
    defaultMessage: 'URLs expire quickly',
    description: 'Title for the warning message when the viewer URL has expired',
  },
});

export default messages;
