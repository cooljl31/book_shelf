import Axios from 'axios';

const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj = item;

    return obj;
  }, {});

export const getBooks = (limit,start,order,list='') => {
  const request = Axios
  .get(`/api/books?limit=${limit}&start=${start}&oder=${order}`)
  .then(response => {
    if (list) {
      return [...list,...response.data];
    } else {
      return response.data;
    }
  });

  return {
    type:'GET_BOOKS',
    payload:request
  };
};

export const getBookWithReviewer = (id) =>  {
  const request = Axios.get(`/api/books?id=${id}`);
  return (dispatch)=>{
    request.then(({data})=>{
      let book = arrayToObject(data);



       Axios.get(`/api/reviewer?id=${book.ownerID}`)
       .then(({data}) => {
          let response = {
            book,
            reviewer:data
          };

          dispatch({
            type:'GET_BOOK_REVIEWER',
            payload:response
          });
      });
    });
  };
};


export const clearBookWithReviewer = () => ({
    type: 'CLEAR_BOOK_REVIEWER',
    payload: {
      book: {},
      reviewer: {}
    }
  }
);


export const clearNewBook = () => ({
  type: 'CLEAR_NEWBOOK',
  payload: {
    book: {},
    reviewer: {}
  }
}
);

export const addBook = (book) => {
  const request = Axios.post('/api/book', book)
                            .then((response) => response.data);
  return {
    type: 'ADD_BOOK',
    payload: request
  };
 };


 export const getBook = (bookID) => {
  const request = Axios.get(`/api/books?id=${bookID}`)
                            .then((response) => arrayToObject(response.data));
  return {
    type: 'GET_BOOK',
    payload: request
  };
 };

 export const updateBook = (data) => {
  const request = Axios.put('/api/book',data)
                            .then((response) => response.data);

  return {
    type: 'UPDATE_BOOK',
    payload: request
  };
 };


 export const deleteBook = (bookID) => {
  const request = Axios.delete(`/api/book?id=${bookID}`)
                            .then((response) => response.data);

  return {
    type: 'DELETE_BOOK',
    payload: request
  };
 };

 export const clearDeleteBook = () => ({
  type: 'CLEAR_DELETEBOOK',
  payload: {
    book: {},
    updateBook:false,
    postDelete:false
  }
}
);

/* USER */

export const loginUser = ({email,password}) => {
  const request = Axios.post('/api/login', {email,password})
                            .then((response) => response.data);
  return {
    type: 'USER_LOGIN',
    payload: request
  };
 };

 export const auth = () => {
  const request = Axios.get('/api/auth')
                            .then((response) => response.data);
  return {
    type: 'USER_AUTH',
    payload: request
  };
 };

 export const getUserPost = (userID) => {
  const request = Axios.get(`/api/user/posts?id=${userID}`)
                            .then((response) => response.data);

  return {
    type: 'USER_POSTS',
    payload: request
  };
 };

