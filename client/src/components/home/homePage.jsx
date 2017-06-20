import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as documentActions from '../../actions/documentActions.js';
import DocumentList from '../document/documentsList.jsx';
import Search from '../document/search.jsx';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = props.documents;
  }
  componentWillMount() {
    // this.setState({ publicDocuments: this.props.documents });
    this.props.actions.loadPublicDocuments(this.props.documents);
  }
  render() {
    const loggedIn = localStorage.getItem('jwt');
    console.log('Logged In', loggedIn);
    return (
      <div>
        <h2> Welcome to Dockman </h2>
        <p>Public Documents</p>
        <Search />
        <DocumentList documents={this.props.documents} view />
      </div>

    );
  }
}
const mapStateToProps = (state, ownProps) => ({ documents: state.documents });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
