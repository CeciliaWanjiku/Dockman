import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
  redirectToAddDocumentPage() {
    browserHistory.push('/document/create');
  }
  render() {
    return (
      <div>
        <h4> My Documents </h4>
        <a className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons" onClick={this.redirectToAddDocumentPage}>add</i></a>
        {/*<button
          onClick={this.redirectToAddDocumentPage}
        >Add Document</button>*/}
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
