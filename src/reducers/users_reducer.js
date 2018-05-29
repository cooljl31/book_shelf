const userInitialState = {};
export default (state = userInitialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {...state,login:action.payload};
    case 'USER_AUTH':
      return {...state,login:action.payload};
    case 'USER_POSTS':
      return {...state,userPosts:action.payload};
    default:
      return state;
  }
};

