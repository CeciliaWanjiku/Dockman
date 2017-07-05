import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as documentActions from '../../actions/documentActions.js';
import DocumentList from '../document/documentsList.jsx';
import Search from '../document/search.jsx';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1, limit: 5, offset: 0 };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentWillMount() {
    this.props.actions.loadPublicDocuments(this.state.limit, this.state.offset);
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.loadPublicDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  render() {
    const { documents } = this.props;
    console.log('this...', documents);
    const totalCount = documents.count;
    console.log('then>>>>', totalCount);
    // delete documents.count;
    // const loggedIn = localStorage.getItem('jwt');

    return (
      <div>
        <h4> Welcome to Dockman </h4>
        <Search />
        <DocumentList documents={documents.filter(doc => doc.constructor === Object)} view />
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
const mapStateToProps = state => ({ documents: state.documents });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
