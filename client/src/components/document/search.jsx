import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions.js';


class Search extends React.Component {
  constructor(props, context) {
    super(props);
    this.searchDocument = this.searchDocument.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }
  searchDocument(searchValue) {
    this.props.actions.searchDocument(searchValue);
  }
  handleSearchInput(e){
    console.log(e.target.value);
    this.setState({ searchValue: e.target.value });
  }
  render() {
    // const { documents } = this.props;
    return (
      <div>
        <input
          onChange={this.handleSearchInput}
        />
        <button
          onClick={(e) => { e.preventDefault(); this.searchDocument(this.state.searchValue); }}
        >Search Document</button>
      </div>

    );
  }
}
// DocumentsPage.proptypes = {
//   documents: proptypes.object.isRequired,
// actions:PropTypes.object.isRequired
// };
// // function mapStateToProps(state, ownProps) {
// //   return {
// //     documents: state.documents
// //   };
// // }

const mapStateToProps = (state, ownProps) => ({ documents: state.documents });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
