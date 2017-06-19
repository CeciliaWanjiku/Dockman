import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DocumentListRow = ({ document }) => (
  <tr>
    <td><Link to={`/document/${document.id}`}> {document.name} </Link> </td>
    <td>{document.content}</td>
    <td>{document.category}</td>
    <td>{document.userId}</td>
  </tr>
  );
DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired
};
export default DocumentListRow;
