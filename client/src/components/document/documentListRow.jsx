import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DocumentListRow = ({ document }) => {
  return (
    <tr>
      <td><Link to={`/document/${document.id}`}> {document.name} </Link> </td>
      <td>{document.ownerId}</td>
      <td>{document.category}</td>
    </tr>
  );
};
DocumentListRow.PropTypes = {
  document:PropTypes.object.isRequired
};
export default DocumentListRow;
