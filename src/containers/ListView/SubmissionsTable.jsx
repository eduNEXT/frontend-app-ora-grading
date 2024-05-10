import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  DataTable,
  TextFilter,
  MultiSelectDropdownFilter,
  Button,
  Hyperlink,
} from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { gradingStatuses, submissionFields } from 'data/services/lms/constants';
import lmsMessages from 'data/services/lms/messages';

import { selectors, thunkActions, actions } from 'data/redux';

import StatusBadge from 'components/StatusBadge';
import FilterStatusComponent from './FilterStatusComponent';
import TableAction from './TableAction';
import SelectedBulkAction from './SelectedBulkAction';

import messages from './messages';

const problemSteps = {
  problemStepsTraining: true,
  problemStepsPeers: false,
  problemStepsSelf: true,
  problemStepsStaff: true,
};
/**
 * <SubmissionsTable />
 */
export class SubmissionsTable extends React.Component {
  get gradeStatusOptions() {
    return Object.keys(gradingStatuses).map((statusKey) => ({
      name: this.translate(lmsMessages[gradingStatuses[statusKey]]),
      value: gradingStatuses[statusKey],
    }));
  }

  get userLabel() {
    return this.translate(
      this.props.isIndividual ? messages.username : messages.teamName,
    );
  }

  get userAccessor() {
    return this.props.isIndividual
      ? submissionFields.username
      : submissionFields.teamName;
  }

  get dateSubmittedLabel() {
    return this.translate(this.props.isIndividual
      ? messages.learnerSubmissionDate
      : messages.teamSubmissionDate);
  }

  formatDate = ({ value }) => {
    const date = new Date(moment(value));
    return date.toLocaleString();
  };

  formatGrade = ({ value: score }) => (score === null ? '-' : `${score.pointsEarned}/${score.pointsPossible}`);

  formatStatus = ({ value }) => <StatusBadge status={value} />;

  formatProblemStepsStatus = () => {
    const stepProblems = Object.keys(problemSteps);
    return (
      <div>
        {stepProblems.map((stepProblem) => (
          <Button
            variant="tertiary"
            className="step-problems-button-badge"
            key={stepProblem}
          >
            <StatusBadge
              status={problemSteps[stepProblem] ? 'graded' : 'ungraded'}
              title={this.translate(messages[stepProblem])}
            />
          </Button>
        ))}
      </div>
    );
  };

  handleProblemStepsDetailClick = (data, currentRow) => {
    const submissionUUIDs = data.map((row) => row.submissionUUID);
    const submissionId = currentRow.original.submissionUUID;
    const currentRowIndex = submissionUUIDs.indexOf(submissionId);
    this.props.loadSelectionForReview(submissionUUIDs, false, submissionId);
    this.props.setActiveSubmissionIndex(currentRowIndex);
    this.props.setProblemStepsModal(true);
  };

  problemStepsViewDetails = ({ data, row: currentRow }) => (
    <Button
      variant="link"
      className="btn-view-details"
      size="sm"
      onClick={() => this.handleProblemStepsDetailClick(data, currentRow)}
    >
      {this.translate(messages.actionDetail)}
    </Button>
  );

  emailAddressCell = () => (
    <Hyperlink destination="#" showLaunchIcon={false}>
      email@example.com
    </Hyperlink>
  );

  translate = (...args) => this.props.intl.formatMessage(...args);

  handleViewAllResponsesClick = (data) => () => {
    const getSubmissionUUID = (row) => row.original.submissionUUID;
    this.props.loadSelectionForReview(data.map(getSubmissionUUID));
  };

  render() {
    if (!this.props.listData.length) {
      return null;
    }
    return (
      <div className="submissions-table">
        <DataTable
          data-testid="data-table"
          isFilterable
          FilterStatusComponent={FilterStatusComponent}
          numBreakoutFilters={2}
          defaultColumnValues={{ Filter: TextFilter }}
          isSelectable
          isSortable
          isPaginated
          itemCount={this.props.listData.length}
          initialState={{ pageSize: 10, pageIndex: 0 }}
          data={this.props.listData}
          tableActions={[
            <TableAction handleClick={this.handleViewAllResponsesClick} />,
          ]}
          bulkActions={[
            <SelectedBulkAction handleClick={this.handleViewAllResponsesClick} />,
          ]}
          columns={[
            {
              Header: this.userLabel,
              accessor: this.userAccessor,
            },
            {
              Header: this.translate(messages.emailLabel),
              accessor: null,
              Cell: this.emailAddressCell,
            },
            {
              Header: this.dateSubmittedLabel,
              accessor: submissionFields.dateSubmitted,
              Cell: this.formatDate,
              disableFilters: true,
            },
            {
              Header: this.translate(messages.grade),
              accessor: submissionFields.score,
              Cell: this.formatGrade,
              disableFilters: true,
            },
            {
              Header: this.translate(messages.gradingStatus),
              accessor: submissionFields.gradingStatus,
              Cell: this.formatStatus,
              Filter: MultiSelectDropdownFilter,
              filter: 'includesValue',
              filterChoices: this.gradeStatusOptions,
            },
            {
              Header: this.translate(messages.problemSteps),
              Cell: this.formatProblemStepsStatus,
            },
          ]}
          additionalColumns={[
            {
              id: 'action',
              Header: this.translate(messages.action),
              Cell: this.problemStepsViewDetails,
            },
          ]}
        >
          <DataTable.TableControlBar />
          <DataTable.Table />
          <DataTable.TableFooter />
        </DataTable>
      </div>
    );
  }
}
SubmissionsTable.defaultProps = {
  listData: [],
};
SubmissionsTable.propTypes = {
  // injected
  intl: intlShape.isRequired,
  // redux
  isIndividual: PropTypes.bool.isRequired,
  listData: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    dateSubmitted: PropTypes.string,
    gradingStatus: PropTypes.string,
    score: PropTypes.shape({
      pointsEarned: PropTypes.number,
      pointsPossible: PropTypes.number,
    }),
  })),
  loadSelectionForReview: PropTypes.func.isRequired,
  setProblemStepsModal: PropTypes.func.isRequired,
  setActiveSubmissionIndex: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  listData: selectors.submissions.listData(state),
  isIndividual: selectors.app.ora.isIndividual(state),
});

export const mapDispatchToProps = {
  loadSelectionForReview: thunkActions.grading.loadSelectionForReview,
  setProblemStepsModal: actions.problemSteps.setOpenReviewModal,
  setActiveSubmissionIndex: actions.grading.setActiveIndex,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SubmissionsTable));
