import jwtDecode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('authTokens');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // Current time in seconds

    // Check if the token is expired
    if (decoded.exp < now) {
      localStorage.removeItem('authTokens');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return false;
  }
};

export const getUserDetails = () => {
  const token = localStorage.getItem('authTokens');
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }
  return null;
};
