const userInitialState = {};
export default (state = userInitialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {...state,login:action.payload};
    case 'USER_AUTH':
      return {...state,login:action.payload};
    case 'USER_POSTS':
      return {...state,userPosts:action.payload};
    case 'GET_USERS':
      return {...state,users:action.payload};
    case 'USER_REGISTER':
      return {
        ...state,
        users: action.payload.users,
        register: action.payload.data
      };
    default:
      return state;
  }
};

