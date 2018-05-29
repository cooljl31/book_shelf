export default (state={},action) =>  {
  switch (action.type) {
    case 'GET_BOOKS':
        return {...state,list:action.payload};
    case 'GET_BOOK':
        return {...state,book:action.payload};
    case 'ADD_BOOK':
        return {...state,newBook:action.payload};
    case 'CLEAR_NEWBOOK':
        return {...state,newBook:action.payload};
    case 'UPDATE_BOOK':
        return {
            ...state,
           updateBook:action.payload.success,
           book:action.payload
        };
    case 'DELETE_BOOK':
        return {...state,postDeleted:action.payload};
    case 'GET_BOOK_REVIEWER':
        return {
          ...state,
          book:action.payload.book,
          reviewer:action.payload.reviewer
        };
    case 'CLEAR_BOOK_REVIEWER':
        return {
          ...state,
          book:action.payload.book,
          reviewer:action.payload.reviewer
        };
    default:
      return state;
  }
};
