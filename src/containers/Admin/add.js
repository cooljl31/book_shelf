import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addBook, clearNewBook} from '../../actions/index';
import {Link} from 'react-router-dom';

class AddReview extends Component {

  state = {
    formData:{
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
    this.props.dispatch(addBook({
      ...this.state.formData,
      ownerID: this.props.user.login.id
    }));

  }

  showNewBook = (book) => (
    book.post ?
      <div className="conf_link">
        cool !!! <Link to={`/book/${book.bookID}`}>
          Clcik the libk to see the post
        </Link>
      </div>
    :null
  )

  componentWillUnmount() {
    this.props.dispatch(clearNewBook());
  }


  render() {
    return (
      <div className="rl_container article" >
        <form onSubmit={this.submitForm} >
          <h2>Add a review</h2>

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
              <option  value="1">1</option>
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
          <button type="submit">Add Review</button>
          {this.props.books.newBook ?
            this.showNewBook(this.props.books.newBook)
          :null
        }
        </form>
      </div>
    );
  }
}

AddReview.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({
    login: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  books: PropTypes.shape({
    newBook: PropTypes.object,
  }),
};

const mapStateToProps = (state) => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(AddReview);

