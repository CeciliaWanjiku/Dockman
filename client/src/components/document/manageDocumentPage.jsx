import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documenActions from '../../actions/documentActions';
import DocumentForm from './documentForm.jsx';
import toastr from 'toastr';
import _ from 'lodash';

export class ManageDocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: Object.assign({}, this.props.document),
      errors: {},
      saving: false
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

  documentFormIsValid() {
    let formIsValid = true;
    const errors = {};

    if (this.state.document.name.length < 5) {
      errors.name = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  updateDocument(event) {
    event.preventDefault();
    if (!this.documentFormIsValid()) {
      toastr.error('Document title should be longer than 5 characters!!');
      return;
    }
    this.setState({ saving: true });

    if (/\/create$/.test(this.props.location.pathname)) {
      this.state.document.category = this.state.document.category || 'public';
      this.props.actions.createDocument(this.state.document);
    } else {
      this.props.actions.updateDocument(this.state.document);
    }
    this.redirect();
  }
  redirect() {
    this.setState({ saving: false });
    toastr.success('Document saved');
    browserHistory.push('document/userdocuments');
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
          saving={this.state.saving}
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentPage);
