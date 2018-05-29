import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  getBook,
  updateBook,
  deleteBook,
  clearDeleteBook
} from '../../actions/index';
import {Link} from 'react-router-dom';

class EditBook extends PureComponent {

  state = {
    formData:{
      _id: this.props.match.params.id,
      name:'',
      author:'',
      review:'',
      pages:'',
      rating:'',
      price:''
    }
  }

  handleInput = (event,name) => {
    const newFormData = {
      ...this.state.formData
    };
    newFormData[name] = event.currentTarget.value;
    this.setState({formData: newFormData});
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.dispatch(updateBook(this.state.formData));
  }

  deletePost = () => {
    this.props.dispatch(deleteBook(this.props.match.params.id));
  }

  componentWillMount() {
    this.props.dispatch(getBook(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearDeleteBook());
  }

  componentWillReceiveProps(nextProps){
    let book = nextProps.books.book;

    this.setState({
      formData: {
      _id: book._id,
      name: book.name,
      author: book.author,
      review: book.review,
      pages: book.pages,
      rating: book.rating,
      price: book.price
    }});
  }

  redirectUser = () => {
    setTimeout(()=>{
      this.props.history.push('/user/user-reviews');
    }, 1000);
  }

  render() {
    let books = this.props.books;


    return (
      <div className="rl_container article" >
        { books.updateBook ?
          <div className="edit_confirm">
            post updated, <Link to={`/book/${books.book.doc._id}`}>
            Click to see you post
            </Link>
          </div>
          :null
        }
        { books.postDeleted ?
            <div className="red_tag">
              post deleted
              {this.redirectUser()}
            </div>
          :null
        }
        <form onSubmit={this.submitForm} >
          <h2>Edit review</h2>
          <div className="form_element">
          <input
            type="text"
            onChange={(event)=>this.handleInput(event,'name')}
            placeholder="Enter name"
            value={this.state.formData.name}
            />
          </div>
          <div className="form_element">
          <input
            type="text"
            onChange={(event)=>this.handleInput(event,'author')}
            placeholder="Enter author"
            value={this.state.formData.author}
            />
          </div>

          <textarea
            value={this.state.formData.review}
            onChange={(event)=>this.handleInput(event,'review')}
          >
          </textarea>
          <div className="form_element">
          <input
            type="number"
            onChange={(event)=>this.handleInput(event,'pages')}
            placeholder="Enter pages"
            value={this.state.formData.pages}
            />
          </div>
          <div className="form_element">
            <select
              value={this.state.formData.rating}
              onChange={(event)=>this.handleInput(event,'rating')}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form_element">
          <input
            type="number"
            onChange={(event)=>this.handleInput(event,'price')}
            placeholder="Enter price"
            value={this.state.formData.price}
            />
          </div>
          <button type="submit">Edit Review</button>
          <div className="delete_post">
            <div className="button"
              onClick={this.deletePost}
            >
              Delete review
            </div>
          </div>

        </form>
      </div>
    );
  }
}

EditBook.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({
    login: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  books: PropTypes.shape({
    newBook: PropTypes.object,
    book: PropTypes.object,
  }),
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(EditBook);

