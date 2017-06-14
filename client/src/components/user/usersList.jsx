import React, { PropTypes } from 'react';
import UserListRow from './UserListRow.jsx';


const UsersList = ({ users }) => (
  <table>
    <thead>
      <tr>
        <th> Name </th>
        <th> Email </th>
        <th> Password </th>
      </tr>
    </thead>
    <tbody>
      {users.map(user =>
        <UserListRow key={user.id} user={user} />
      )}
    </tbody>
  </table>
  );
UsersList.PropTypes = {
  users: PropTypes.array.isRequired
};

export default UsersList;