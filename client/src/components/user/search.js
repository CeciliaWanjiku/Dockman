import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';


class Search extends React.Component {
  constructor(props, context) {
    super(props);
    this.searchUser = this.searchUser.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }
  searchUser(searchValue) {
    this.props.actions.searchUser(searchValue);
  }
  handleSearchInput(e) {
    console.log(e.target.value);
    this.setState({ searchValue: e.target.value });
  }
  render() {
    return (
      <div className="search-wrapper card">
        <input
          id="search"
          onChange={this.handleSearchInput}
        />
        <i className="material-icons" onClick={(e) => { e.preventDefault(); this.searchUser(this.state.searchValue); }}>search</i>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({ users: state.users });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
