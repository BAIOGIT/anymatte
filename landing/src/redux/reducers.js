import { 
  SET_LOGIN_METHOD, 
  RESET_LOGIN_METHOD, 
  SHOW_LOGIN_PANEL, 
  SHOW_REGISTER_PANEL, 
  SHOW_PRICING_PANEL,
  HIDE_ALL_PANELS, } from './actions';

import {
  SET_UPLOAD_MODE,
  SET_UPLOAD_UUID,
  SET_UPLOAD_PERMISSION,
  RESET_UPLOAD_PERMISSION,
  SET_UPLOAD_COUNT,
  SET_UPLOAD_MAX_COUNT,
} from './actions';

const initialState = {
  showLoginPanel: false,
  showRegisterPanel: false,
  showPricingPanel: false,
  loginMethod: null,
  uploadMode: 'empty',
  uploadUuid: null,
  canUpload: false,
  uploadCount: 0,
  uploadMaxCount: 1,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN_PANEL:
      return { ...state, showLoginPanel: true, showRegisterPanel: false };
    case SHOW_REGISTER_PANEL:
      return { ...state, showLoginPanel: false, showRegisterPanel: true };
    case SHOW_PRICING_PANEL:
      return { ...state, showPricingPanel: true };      
    case HIDE_ALL_PANELS:
      return { ...state, showLoginPanel: false, showRegisterPanel: false, showPricingPanel: false };
    default:
      return state;
  }
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_METHOD:
      return {
        ...state,
        loginMethod: action.payload,
      };
    case RESET_LOGIN_METHOD:
      return {
        ...state,
        loginMethod: null,
      };
    default:
      return state;
  }
};

export const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPLOAD_MODE:     
      return { 
        ...state, 
        uploadMode: action.payload,
      };
    case SET_UPLOAD_UUID:
      // // DEBUG --> console.log(action.payload);      
      return { 
        ...state, 
        uploadUuid: action.payload,
      };
    case SET_UPLOAD_PERMISSION:
      return { 
        ...state, 
        canUpload: action.payload,
      };
    case SET_UPLOAD_COUNT:
      return { 
        ...state, 
        uploadCount: action.payload,
      };
    case SET_UPLOAD_MAX_COUNT:
      return { 
        ...state, 
        uploadMaxCount: action.payload,
      };
    case RESET_UPLOAD_PERMISSION:
      return { 
        ...state, 
        canUpload: false,
        uploadCount: 0,
        uploadMaxCount: 1,
        uploadUuid: null,
        uploadMode: 'empty',
      };
    default:
        return state;
  }
};

export default { uiReducer, loginReducer, uploadReducer };