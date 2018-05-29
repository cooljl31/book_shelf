import React from 'react';
import BookView from '../../containers/book_container';

const Book = (props) => {
  return (
    <div>

      <BookView {...props}/>
    </div>
  );
};

export default Book;
