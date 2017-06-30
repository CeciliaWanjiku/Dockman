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
      // document: {
      //   role_type
      // }

    };
  }
  render() {
    // const saving = this.props.saving;
    const token = this.props.session.token || localStorage.getItem('jwt');
    const user = token && jwtDecode(token);
    const role_type = user.data.role_type;
    const document = this.props.document;

    console.log('dafljadfl', role_type);
    console.log('props: ', this.props);
    return (
      <form
        className="col s12"
        onSubmit={this.props.onSave}
      >
        <h1>Manage Document</h1>
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
        { document.category === 'role-based'
    ? <input
      className="input-field col s12"
      name="role_type"
      label="role_type"
      defaultValue={role_type}
      onChange={this.props.onChange}
    />
    : ''

    }
        <input
          className="waves-effect waves-light btn"
          type="submit"
          disabled={this.props.saving}
          value={this.props.saving ? 'Saving...' : 'Save'}
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);

// const DocumentForm = ({ document, allAuthors, onSave, onChange, saving, errors }) => (

//   );
// DocumentForm.propTypes = {
//   document: React.PropTypes.object.isRequired,
//   allAuthors: React.PropTypes.array,
//   onSave: React.PropTypes.func.isRequired,
//   onChange: React.PropTypes.isRequired,
//   saving: React.PropTypes.bool
//   // errors: React.PropTypes.object
// };
// export default DocumentForm;
