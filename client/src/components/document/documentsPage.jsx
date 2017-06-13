import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions.js';
import DocumentList from './documentsList.jsx';


class DocumentsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.props.actions.loadDocuments();

    this.redirectToAddDocumentPage = this.redirectToAddDocumentPage.bind(this);
  }
  documentRow(document, index) {
    return <div key={index}> {document.name} </div>;
  }
  redirectToAddDocumentPage() {
    browserHistory.push('/document/create');
  }
  render() {
    const { documents } = this.props;
    return (
      <div>
        <h1> Documents </h1>
        <button
          onClick={this.redirectToAddDocumentPage}
        >Add Document</button>
        <DocumentList documents={documents} />
      </div>

    );
  }
}
// DocumentsPage.proptypes = {
//   documents: proptypes.object.isRequired
// actions:PropTypes.object.isRequired
// };
function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
