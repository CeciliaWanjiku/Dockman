import React from 'react';
import TextInput from '../common/TextInput.jsx';
import SelectInput from '../common/SelectInput.jsx';
import TextArea from '../common/TextArea.jsx';


const DocumentForm = ({ document, allAuthors, onSave, onChange, loading, errors }) => (
  <form onSubmit={onSave}>
    <h1> Manage Document </h1>
    <TextInput
      name="name"
      label="Title"
      value={document.name}
      onChange={onChange}

    />
    {/* <SelectInput
      name="name"
      label="name"
      value={document.userId}
      defaultOption="Select Doc Owner"
      options={allAuthors}
    />*/}
    {/* <textarea
      name="content"
      label="content"
      value={document.content}
      onChange={onChange}
    />*/}
    <TextArea
      name="content"
      label="Content Area"
      value={document.content}
      onChange={onChange}
    />
    <TextInput
      name="category"
      label="category"
      value={document.category}
      onChange={onChange}

    />
    <input
      type="submit"
      disabled={loading}
      value={loading ? 'Saving...' : 'Save'}
      onClick={onSave}
    />
  </form>
  );
DocumentForm.propTypes = {
  document: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.isRequired,
  loading: React.PropTypes.bool,
  // errors: React.PropTypes.object
};
export default DocumentForm;
