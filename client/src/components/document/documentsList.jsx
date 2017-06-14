import React, { PropTypes } from 'react';
import DocumentListRow from './DocumentListRow.jsx';


const DocumentList = ({ documents }) => (
  <table>
      <thead>
        <tr>
          <th> Title </th>
          <th> Author </th>
          <th> Category </th>
          <th> Content </th>
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
