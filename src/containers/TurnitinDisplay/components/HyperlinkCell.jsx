import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

export const HyperlinkCell = ({ value }) => {
  const intl = useIntl();
  return (
    <Hyperlink destination={value} target="_blank">
      {intl.formatMessage(messages.buttonViewerURLTitle)}
    </Hyperlink>
  );
};
HyperlinkCell.propTypes = {
  value: PropTypes.string.isRequired,
};

export default HyperlinkCell;
