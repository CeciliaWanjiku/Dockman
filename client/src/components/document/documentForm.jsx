import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput.jsx';
import SelectInput from '../common/SelectInput.jsx';
import TextArea from '../common/TextArea.jsx';
import SelectOption from '../common/SelectOption.jsx';
import SelectRoleType from '../common/selectRoleType.js';
import * as sessionActions from '../../actions/sessionActions.js';


class DocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const document = this.props.document;
    return (
      <form
        className="col s12"
        onSubmit={this.props.onSave}
      >
        <h4>Manage Document</h4>
        <TextInput
          name="name"
          label="Title"
          value={document.name}
          onChange={this.props.onChange}
        />
        <TextArea
          className="materialize-textarea"
          name="content"
          label="Content Area"
          value={document.content}
          onChange={this.props.onChange}
        />

        <SelectOption
          className="input-field col s12"
          name="category"
          label="category"
          value={document.category}
          onChange={this.props.onChange}
        />
        <input
          className="waves-effect waves-light btn"
          type="submit"
          disabled={this.props.saving}
          value={this.props.saving ? 'Saving...' : 'Save'}
          style={{ marginTop: '10px' }}
          onClick={this.props.onSave}
        />
      </form>

    );
  }
}
function mapStateToProps(state) {
  return {
    session: state.session
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default DocumentForm;

