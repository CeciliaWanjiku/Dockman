import React from 'react';
import TextInput from '../common/TextInput.jsx';
import SelectInput from '../common/SelectInput.jsx';
import TextArea from '../common/TextArea.jsx';
import SelectOption from '../common/SelectOption.jsx';


const DocumentForm = ({ document, allAuthors, onSave, onChange, saving, errors }) => (
  <form
    className="col s12"
    onSubmit={onSave}
  >
    <h1>Manage Document</h1>
    <TextInput
      name="name"
      label="Title"
      value={document.name}
      onChange={onChange}

    />
    <TextArea
      className="materialize-textarea"
      name="content"
      label="Content Area"
      value={document.content}
      onChange={onChange}
    />
    <SelectOption
      className="input-field col s12"
      name="category"
      label="category"
      value={document.category}
      onChange={onChange}
    />

    <input
      className="waves-effect waves-light btn"
      type="submit"
      disabled={saving}
      value={saving ? 'Saving...' : 'Save'}
      onClick={onSave}
    />
  </form>
  );
DocumentForm.propTypes = {
  document: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.isRequired,
  saving: React.PropTypes.bool
  // errors: React.PropTypes.object
};
export default DocumentForm;
