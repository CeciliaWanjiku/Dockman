import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as documentActions from '../../actions/documentActions.js';
import DocumentList from '../document/documentsList.jsx';
import Search from './search.jsx';

class UserDocumentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1, limit: 5, offset: 0, totalDocuments: null };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentWillMount() {
    const token = this.props.session.token || localStorage.getItem('jwt');
    const user = token && jwtDecode(token);
    this.props.actions.userDocuments(this.state.limit, this.state.offset, user.data.role_type);
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.loadDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  redirectToAddDocumentPage() {
    browserHistory.push('/document/create');
  }
  render() {
    console.log ('new dosc', this.props.documents);
    const { documents } = this.props;
    const totalCount = documents.count;
    delete documents.count;
    console.log ('new dosc', this.props.documents);
    // console.table(this.props.documents);
    return (
      <div>
        <h4> My Documents </h4>
        <a className="btn-floating btn-large waves-effect waves-light red" style={{ backgroundColor: 'tomato' }}>
          <i className="material-icons" onClick={this.redirectToAddDocumentPage}>add</i></a>
        <Search />
        <DocumentList documents={this.props.documents} />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.limit}
          totalItemsCount={totalCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>

    );
  }
}
const mapStateToProps = (state, ownProps) => ({ documents: state.documents, session: state.session });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(UserDocumentsPage);
