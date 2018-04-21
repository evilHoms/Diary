import { TO_AUTH_FORM, TO_MAIN_SCREEN, SIGN_IN_ERROR, 
  SIGN_UP_ERROR, DB_ERROR, NEW_ACCOUNT, CODE_IS_NEEDED, LOADING, LOADED } from "../constants";

const initialState = {
  page: "auth_form",
  isLoading: false,
  pageState: "ok"
}

const rootReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case TO_AUTH_FORM:
      newState.page = 'auth_form';
      newState.pageState = 'ok';
      break;
    case TO_MAIN_SCREEN:
      newState.page = 'main_screen';
      newState.pageState = 'ok';
      break;
    case SIGN_IN_ERROR:
      newState.pageState = 'signin_error';
      break;
    case DB_ERROR:
      newState.pageState = 'db_error';
      break;
    case SIGN_UP_ERROR:
      newState.pageState = 'signup_error';
      break;
    case NEW_ACCOUNT:
      newState.pageState = 'new_account';
      break;
    case CODE_IS_NEEDED:
      newState.pageState = 'code_is_needed';
      break;
    case LOADING:
      newState.isLoading = true;
      break;
    case LOADED: 
      newState.isLoading = false;
      break;
  }
  return newState;
};

export default rootReducer;