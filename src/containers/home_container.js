import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../actions/index';
import BookItem from '../widgetsUi/book_item';
import PropTypes from 'prop-types';

class HomeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(getBooks(3,0,'desc'));
  }

  renderItems = (books) => (
    books.list ?
      books.list.map((item,i) => (
        <BookItem {...item} key={i} />
      ))
      :null
  )


  loadmore = () => {
    let count = this.props.books.list.length;
    this.props.dispatch(getBooks(3,count,'desc',this.props.books.list));
  }

  render() {
    return (
      <div>
      {this.renderItems(this.props.books)}
      <div className="loadmore"
      onClick={this.loadmore}
      >
        Load more
      </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  books: PropTypes.shape({
    list: PropTypes.array,
  }),
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => (
  {books: state.books}
);



export default connect(mapStateToProps)(HomeContainer);

