import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Card, Collapsible, Icon, DataTable, Alert,
} from '@edx/paragon';
import { ArrowDropDown, ArrowDropUp, WarningFilled } from '@edx/paragon/icons';
import messages from './components/messages';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import FileNameCell from './components/FileNameCell';
import HyperlinkCell from './components/HyperlinkCell';
import { selectors } from 'data/redux';


/**
 * <TurnitinDisplay />
 */
export const TurnitinDisplay = ({ viewers, intl }) => {
  const [isWarningOpen, setIsWarningOpen] = useState(true);
  return <Card className="submission-files p-3">
    {viewers.length ? (
      <>
        <Collapsible.Advanced defaultOpen>
          <Collapsible.Trigger className="submission-files-title">
            <h3>{intl.formatMessage(messages.similarityReportsTitle)}</h3>
            <Collapsible.Visible whenClosed>
              <Icon src={ArrowDropDown} />
            </Collapsible.Visible>
            <Collapsible.Visible whenOpen>
              <Icon src={ArrowDropUp} />
            </Collapsible.Visible>
          </Collapsible.Trigger>
          <Collapsible.Body className="submission-files-body">
            <Alert
              variant="warning"
              dismissible
              icon={WarningFilled}
              show={isWarningOpen}
              onClose={() => setIsWarningOpen(false)}
            >
              <Alert.Heading as="h4">{intl.formatMessage(messages.viewerURLExpiredTitle)}</Alert.Heading>
              <p className="small mb-0">{intl.formatMessage(messages.viewerURLExpired)}</p>
            </Alert>
            <div className="submission-files-table">
              <DataTable
                columns={[
                  {
                    Header: intl.formatMessage(messages.fileNameTableHeader),
                    accessor: "file_name",
                    Cell: FileNameCell,
                  },
                  {
                    Header: intl.formatMessage(messages.URLTableHeader),
                    accessor: "url",
                    Cell: HyperlinkCell,
                  },
                ]}
                data={viewers}
                itemCount={viewers.length}
              >
                <DataTable.Table />
              </DataTable>
            </div>
          </Collapsible.Body>
        </Collapsible.Advanced>
        <Card.Footer>
        </Card.Footer>
      </>
    ) : (
      <div className="submission-files-empty">
        <WarningFilled />
        <p>{intl.formatMessage(messages.noSimilarityReports)}</p>
      </div>
    )}
  </Card>
};


TurnitinDisplay.defaultProps = {
  viewers: [],
};


TurnitinDisplay.propTypes = {
  viewers: PropTypes.arrayOf(
    PropTypes.shape({
      viewer_url: PropTypes.string.isRequired,
    }),
  ),
  // injected
  intl: intlShape.isRequired,
};

export const mapStateToProps = (state) => ({
  viewers: selectors.grading.selected.turnitinViewers(state),
});

export const mapDispatchToProps = {};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TurnitinDisplay));
