import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const UserListRow = ({ user }) => (
  <tr>
    <td><Link to={`/user/${user.id}`}> {user.name} </Link> </td>
    <td>{user.email}</td>
  </tr>
  );
UserListRow.PropTypes = {
  document: PropTypes.object.isRequired
};
export default UserListRow;
