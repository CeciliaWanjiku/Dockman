import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions.js';


class DocumentsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: { name: '' }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }
  onTitleChange(event) {
    const document = this.state.document;
    document.name = event.target.value;
    this.setState({ document });
  }
  onClickSave() {
    this.props.actions.createDocument(this.state.document);
  }
  documentRow(document, index) {
    return <div key={index}> {document.name} </div>;
  }
  render() {
    return (
      <div>
        <h1> Documents </h1>
        {this.props.documents.map(this.documentRow)}
        <h2> add documents </h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.document.name}
        />
        <input
          type="submit"
          value="save"
          onClick={this.onClickSave}
        />
      </div>

    );
  }
}
// DocumentsPage.proptypes = {
//   documents: proptypes.object.isRequired
// actions:PropTypes.object.isRequired
// };
function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
