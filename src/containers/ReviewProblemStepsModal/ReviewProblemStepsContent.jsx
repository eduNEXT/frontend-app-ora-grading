import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Col, Row } from '@edx/paragon';

import { selectors } from 'data/redux';
import { RequestKeys } from 'data/constants/requests';

import ResponseDisplay from 'containers/ResponseDisplay';
import Rubric from 'containers/Rubric';
import ReviewErrors from 'containers/ReviewModal/ReviewErrors';

/**
 * <ReviewProblemStepsContent />
 */
export const ReviewProblemStepsContent = ({ isFailed, isLoaded, showRubric }) => (isLoaded || isFailed) && (
<div className="content-block">
  <div className="content-wrapper">
    <ReviewErrors />
    {isLoaded && (
    <Row className="flex-nowrap m-0">
      <Col className="p-0">
        <ResponseDisplay />
      </Col>
      {showRubric && <Rubric />}
    </Row>
    )}
  </div>
</div>
);
ReviewProblemStepsContent.defaultProps = {
  isFailed: false,
  isLoaded: false,
  showRubric: false,
};
ReviewProblemStepsContent.propTypes = {
  isFailed: PropTypes.bool,
  isLoaded: PropTypes.bool,
  showRubric: PropTypes.bool,
};

export const mapStateToProps = (state) => ({
  isFailed: selectors.requests.isFailed(state, {
    requestKey: RequestKeys.fetchSubmission,
  }),
  isLoaded: selectors.requests.isCompleted(state, {
    requestKey: RequestKeys.fetchSubmission,
  }),
  showRubric: selectors.app.showRubric(state),
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewProblemStepsContent);