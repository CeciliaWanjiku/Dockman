import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documenActions from '../../actions/documentActions';
import DocumentForm from './documentForm.jsx';

class ManageDocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: Object.assign({}, this.props.document),
      errors: {}
    };
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (/\/create$/.test(nextProps.location.pathname)) {
      return;
    }
    if (this.props.document.id !== nextProps.document.id) {
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }


  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }

  updateDocument(event) {
    event.preventDefault();
    if (/\/create$/.test(this.props.location.pathname)) {
      this.props.actions.createDocument(this.state.document);
    } else {
      this.props.actions.updateDocument(this.state.document);
    }
  }
  deleteDocument(event) {
    this.props.actions.deleteDocument(this.state.document);
  }


  render() {
    return (
      <div>
        <DocumentForm
          allAuthors={this.props.users}
          onChange={this.updateDocumentState}
          onSave={this.updateDocument}
          document={this.state.document}
          errors={this.state.error}
        />
        <button
          onClick={this.deleteDocument}
          className="btn btn-default"
        >
           Delete Document
       </button>
      </div>
    );
  }
}

ManageDocumentPage.propTypes = {
  document: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};
function getDocumentById(documents, id) {
  const document = documents.filter(document => document.id == id);
  if (document) return document[0];
  return null;
}
function mapStateToProps(state, ownProps) {
  const documentId = ownProps.params.id;

  let document = { id: '', name: '', content: '', category: '' };

  if (documentId && state.documents.length > 0) {
    document = getDocumentById(state.documents, documentId);
  }
  const usersFormattedForDropdown = state.users.map(user => ({
    value: user.id,
    text: user.name
  }));
  return {
    document,
    users: usersFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documenActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentPage);
