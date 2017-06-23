import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as documenActions from '../../actions/documentActions';


const ViewDocumentPage = ({ document }) => (
  <div className="row">
    <div className="col s12 m12">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{document.name}</span>
          <p>{document.content}</p>
        </div>
      </div>
    </div>
  </div>
  );


ViewDocumentPage.propTypes = {
  document: PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};


const getDocumentById = (documents, docId) => {
  const document = _.find(documents, o => o.id === parseInt(docId, 10));
  return document;
};
const mapStateToProps = (state, ownProps) => {
  const document = getDocumentById(state.documents, ownProps.params.id);
  return {
    document,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documenActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewDocumentPage);
