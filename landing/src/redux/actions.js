export const SHOW_LOGIN_PANEL = 'SHOW_LOGIN_PANEL';
export const SHOW_REGISTER_PANEL = 'SHOW_REGISTER_PANEL';
export const SHOW_PRICING_PANEL = 'SHOW_PRICING_PANEL';
export const HIDE_ALL_PANELS = 'HIDE_ALL_PANELS';

export const showLoginPanel = () => ({ type: SHOW_LOGIN_PANEL });
export const showRegisterPanel = () => ({ type: SHOW_REGISTER_PANEL });
export const showPricingPanel = () => ({ type: SHOW_PRICING_PANEL });
export const hideAllPanels = () => ({ type: HIDE_ALL_PANELS });

export const SET_LOGIN_METHOD = 'SET_LOGIN_METHOD';
export const RESET_LOGIN_METHOD = 'RESET_LOGIN_METHOD';

export const setLoginMethod = (method) => ({
  type: SET_LOGIN_METHOD,
  payload: method,
});

export const resetLoginMethod = () => ({
  type: RESET_LOGIN_METHOD,
});

export const SET_UPLOAD_MODE = 'SET_UPLOAD_UUID';
export const SET_UPLOAD_UUID = 'SET_UPLOAD_UUID';

export const SET_UPLOAD_PERMISSION = 'SET_UPLOAD_PERMISSION';
export const RESET_UPLOAD_PERMISSION = 'RESET_UPLOAD_PERMISSION';

export const SET_UPLOAD_COUNT = 'SET_UPLOAD_COUNT';
export const SET_UPLOAD_MAX_COUNT = 'SET_UPLOAD_MAX_COUNT';

export const storeUploadMode = (method) => ({
  type: SET_UPLOAD_MODE,
  payload: method,
});
export const setUploadUuid = (method) => ({
  type: SET_UPLOAD_UUID,
  payload: method,
});

export const setUploadPermission = (method) => ({
  type: SET_UPLOAD_PERMISSION,
  payload: method,
});

export const storeUploadCount = (method) => ({
  type: SET_UPLOAD_COUNT,
  payload: method,
});

export const storeUploadMaxCount = (method) => ({
  type: SET_UPLOAD_MAX_COUNT,
  payload: method,
});

export const resetUploadPermission = () => ({
    type: RESET_UPLOAD_PERMISSION,
});