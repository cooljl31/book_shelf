/*eslint no-console: ['error', { allow: ['warn','log'] }] */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBookWithReviewer} from '../actions';
import PropTypes from 'prop-types';
import {clearBookWithReviewer} from '../actions/index';

class BookView extends Component {

  componentWillMount() {
    this.props.dispatch(getBookWithReviewer(this.props.match.params.id));
  }
  componentWillUnmount() {
    this.props.dispatch(clearBookWithReviewer());
  }


  renderBook = (books)=> (
    books.book ?
    <div className="br_container">
      <div className="br_header">
        <h2>{books.book.name}</h2>
        <h5>{books.book.author}</h5>
        <div className="br_reviewer">
        <span>Review by:</span> {books.reviewer.name} {books.reviewer.lastname}
        </div>
      </div>
        <div className="br_review">
          {books.book.review}
        </div>
        <div className="br_box">
          <div className="left">
            <div>
              <span>Pages: </span> {books.book.pages}
            </div>
            <div>
              <span>Price:</span> {books.book.price}
            </div>
          </div>
          <div className="right">
            <span>Rating</span>
            <div>{books.book.rating}/5</div>
          </div>
        </div>
      </div>
      :null
  )
  render() {

    return (
      <div>
        {this.renderBook(this.props.books)}
      </div>
    );
  }
}

BookView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }),
  }),
  dispatch: PropTypes.func,
  books: PropTypes.object,
};

const mapStateToProps = (state) => {
 return {books: state.books};
};

export default connect(mapStateToProps)(BookView);
