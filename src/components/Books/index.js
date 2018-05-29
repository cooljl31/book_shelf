import React from 'react';
import BookView from '../../containers/book_container';

const Book = (props) => {
  // console.log(props.match.params.id);
  return (
    <div>

      <BookView {...props}/>
    </div>
  );
};

export default Book;
