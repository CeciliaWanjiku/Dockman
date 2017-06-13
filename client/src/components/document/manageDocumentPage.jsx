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
  }
  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.documment;
    document[field] = event.target.value;
    return this.setState({ document });
  }
  render() {
    return (
      <DocumentForm
        allAuthors={this.props.users}
        onChange={this.updateDocumentState}
        document={this.state.document}
        errors={this.state.error}
      />

    );
  }
}

ManageDocumentPage.propTypes = {
  document: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  const document = { id: '', name: '', ownerId: '', category: '' };
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
