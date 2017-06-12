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
  }
  render() {
    return (
      <DocumentForm
        allAuthors={[]}
        document={this.state.document}
        errors={this.state.error}
      />

    );
  }
}

ManageDocumentPage.propTypes = {
  document: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const document = { id: '', name: '', ownerId: '', category: '' };
  return {
    document
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documenActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentPage);
