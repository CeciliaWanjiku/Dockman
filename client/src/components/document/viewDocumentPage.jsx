import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as documenActions from '../../actions/documentActions';


const ViewDocumentPage = ({ document }) => (
  <div className="col s12">
    <div style={{ display: 'block' }}>
      <div style={{ display: 'inline-block' }}>Name:</div>
      <div style={{ display: 'inline-block' }}>{document.name}</div>
    </div>
    <div style={{ display: 'block' }}>
      <div style={{ display: 'inline-block' }}>Content:</div>
      <div style={{ display: 'inline-block' }}>{document.content}</div>
    </div>
    <div style={{ display: 'block' }}>
      <div style={{ display: 'inline-block' }}>Category:</div>
      <div style={{ display: 'inline-block' }}>{document.category}</div>
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
