import React, { PropTypes } from 'react';
import DocumentListRow from './documentListRow.jsx';


const DocumentList = ({ documents, view }) => (
  <table>
    {console.log('ffdggdfgdfgdfg', view)}
    <thead>
      <tr>
        <th> Title </th>
        <th> Content </th>
      </tr>
    </thead>
    <tbody>
      {documents.map(document =>
        <DocumentListRow key={document.id} document={document} view={view} />
      )}
    </tbody>
  </table>
  );
DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  view: PropTypes.bool,
};

export default DocumentList;
