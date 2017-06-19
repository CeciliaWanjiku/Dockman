import React, { PropTypes } from 'react';
import DocumentListRow from './documentListRow.jsx';


const DocumentList = ({ documents }) => (
  <table>
    <thead>
      <tr>
        <th> Title </th>
        <th> Content </th>
        <th> Category </th>
        <th> Owner Id </th>
      </tr>
    </thead>
    <tbody>
      {documents.map(document =>
        <DocumentListRow key={document.id} document={document} />
      )}
    </tbody>
  </table>
  );
DocumentList.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentList;
