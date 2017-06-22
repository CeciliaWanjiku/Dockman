import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DocumentListRow = ({ document, view }) => (
  <tr>
    <td>
      {
        view ? (
          <Link to={`/document/view/${document.id}`}> {document.name} </Link>
         ) : (
           <Link to={`/document/${document.id}`}> {document.name} </Link>
         )
      }
    </td>
    <td>{document.content}</td>
    {/*<td>{document.category}</td>*/}
    {/*<td>{document.userId}</td>*/}
  </tr>
  );

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  view: PropTypes.bool,
};
export default DocumentListRow;
