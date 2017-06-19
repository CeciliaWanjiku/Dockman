import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as documentActions from '../../actions/documentActions.js';
import DocumentList from '../document/documentsList.jsx';

class UserDocumentsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.userDocuments(this.props.documents);
  }
  render() {
    return (
      <div>
        <h4> User Documents </h4>
        <DocumentList documents={this.props.documents} />
      </div>

    );
  }
}
const mapStateToProps = (state, ownProps) => ({ documents: state.documents });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(UserDocumentsPage);
