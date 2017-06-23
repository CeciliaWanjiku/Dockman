import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';
import * as documentActions from '../../actions/documentActions.js';
import DocumentList from './documentsList.jsx';
import Search from './search.jsx';

class DocumentsPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { activePage: 1, limit: 5, totalDocuments: null, searchValue: '' };

    this.redirectToAddDocumentPage = this.redirectToAddDocumentPage.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.searchDocument = this.searchDocument.bind(this);
  }
  componentDidMount() {
    this.setState({ totalDocuments: this.props.documents.length });
    this.props.actions.loadDocuments(this.state.limit, 0);
  }
  searchDocument(searchValue) {
    this.props.actions.searchDocument(searchValue);
  }
  documentRow(document, index) {
    return <div key={index}> {document.name} </div>;
  }
  redirectToAddDocumentPage() {
    browserHistory.push('/document/create');
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.loadDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  handleSearchInput(e) {
    this.setState({ searchValue: e.target.value });
  }
  render() {
    const { documents } = this.props;
    return (
      <div>
        <h1> Documents </h1>
        <Search />
        <a className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons" onClick={this.redirectToAddDocumentPage}>add</i></a>
        <DocumentList documents={documents} />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.limit}
          totalItemsCount={50}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>

    );
  }
}
// DocumentsPage.proptypes = {
//   documents: proptypes.object.isRequired,
// actions:PropTypes.object.isRequired
// };
// // function mapStateToProps(state, ownProps) {
// //   return {
// //     documents: state.documents
// //   };
// // }

const mapStateToProps = (state, ownProps) => ({ documents: state.documents });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
