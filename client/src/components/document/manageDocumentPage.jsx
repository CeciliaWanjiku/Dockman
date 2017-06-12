import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documenActions from '../../actions/documentActions';

class ManageDocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <h1> Manage Document </h1>

    );
  }
}

ManageDocumentPage.PropTypes = {

};

function mapStateToProps(state, ownProps) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documenActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentPage);
