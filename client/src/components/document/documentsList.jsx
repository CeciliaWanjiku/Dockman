import React, { PropTypes } from 'react';
import DocumentListRow from './documentListRow.jsx';


const DocumentList = ({ documents, view }) => (
  <div>
      {documents.map(document =>
        <DocumentListRow key={document.id} document={document} view={view} />
      )}
  </div>
  );
DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  view: PropTypes.bool,
};

export default DocumentList;
