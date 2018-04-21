import { TO_AUTH_FORM, TO_MAIN_SCREEN, SIGN_IN_ERROR, 
  SIGN_UP_ERROR, DB_ERROR, NEW_ACCOUNT, CODE_IS_NEEDED, LOADING, LOADED} from "../constants";

export const toAuthForm = () => ({type: TO_AUTH_FORM});
export const signinError = () => ({type: SIGN_IN_ERROR});
export const toMainScreen = () => ({type: TO_MAIN_SCREEN});
export const dbError = () => ({type: DB_ERROR});
export const signupError = () => ({type: SIGN_UP_ERROR});
export const newAccount = () => ({type: NEW_ACCOUNT});
export const codeIsNeeded = () => ({type: CODE_IS_NEEDED});
export const loading = () => ({type: LOADING});
export const loaded = () => ({type: LOADED});