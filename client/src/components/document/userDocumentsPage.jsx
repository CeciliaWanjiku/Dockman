import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as documentActions from '../../actions/documentActions.js';
import DocumentList from '../document/documentsList.jsx';
import Search from './search.jsx';

class UserDocumentsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const token = this.props.session.token || localStorage.getItem('jwt');
    const user = token && jwtDecode(token);
    this.props.actions.userDocuments(user.data.role_type);
  }
  redirectToAddDocumentPage() {
    browserHistory.push('/document/create');
  }
  render() {
    console.log('Rendering with: ', this.props);
    // console.table(this.props.documents);
    return (
      <div>
        <h4> My Documents </h4>
        <a className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons" onClick={this.redirectToAddDocumentPage}>add</i></a>
        <Search />
        <DocumentList documents={this.props.documents} />
      </div>

    );
  }
}
const mapStateToProps = (state, ownProps) => ({ documents: state.documents, session: state.session });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(UserDocumentsPage);
