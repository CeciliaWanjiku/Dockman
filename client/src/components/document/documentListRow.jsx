import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DocumentListRow = ({ document, view }) => (
  <section className="section--center">
    <div
      className="row"
      style={{ marginTop: '100px' }}
    >
      <div className="card">
        <div className="card-content">
          <h4 className="card-title">
            {
        view ? (
          <Link to={`/document/view/${document.id}`}> {document.name} </Link>
         ) : (
           <Link to={`/document/${document.id}`}> {document.name} </Link>
         )
      }
          </h4>
          <p><Link to={`/document/${document.id}`}> {document.name} </Link></p>
        </div>
        <div className="card-action">
          <a className="mdl-button">{document.category}</a>
        </div>
      </div>
    </div>
  </section>

  );

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  view: PropTypes.bool,
};
export default DocumentListRow;
