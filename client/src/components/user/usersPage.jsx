import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';
import * as userActions from '../../actions/userActions.js';
import UserList from './usersList.jsx';
import Search from './search';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { activePage: 1, limit: 5, totalUsers: null, searchValue: '' };

    this.redirectToAddUsersPage = this.redirectToAddUserPage.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.searchUser = this.searchUser.bind(this);
  }
  componentDidMount() {
    this.setState({ totalUsers: this.props.users.length });
    this.props.actions.loadUsers(this.state.limit, 0);
  }
  searchUser(searchValue) {
    this.props.actions.searchUser(searchValue);
  }
  userRow(user, index) {
    return <div key={index}> {user.name} </div>;
  }
  redirectToAddUserPage() {
    browserHistory.push('/user/create');
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.loadUsers(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  handleSearchInput(e) {
    this.setState({ searchValue: e.target.value });
  }
  render() {
    const { users } = this.props;
    return (
      <div>
        <Search />
        <h1> Users </h1>
        <a className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons" onClick={this.redirectToAddUserPage}>add</i></a>
        <UserList users={users} />
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
// function mapStateToProps(state, ownProps) {
//   return {
//     documents: state.documents
//   };
// }

const mapStateToProps = (state, ownProps) => ({ users: state.users });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
