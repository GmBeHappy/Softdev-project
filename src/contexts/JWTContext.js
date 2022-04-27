import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// md5
import md5 from 'md5';
// import axios from 'axios';
import axios from '../utils/axios';
// utils
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isRegistered: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state) => ({
    ...state,
    isAuthenticated: false,
    isRegistered: true
  }),
  UPDATE_PROFILE: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/users');
          const { metaData } = response.data;
          console.log(metaData);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: metaData
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    for (let i = 0; i < 10; i += 1) {
      password = md5(password);
    }
    const response = await axios.post('/auth/authenticate', {
      email,
      password
    });
    const { jwtToken } = response.data.metaData;
    window.localStorage.setItem('accessToken', jwtToken);
    setSession(jwtToken);
    const response2 = await axios.get('/users');
    const { metaData } = response2.data;
    console.log(metaData);
    dispatch({
      type: 'LOGIN',
      payload: {
        user: metaData
      }
    });
  };

  const register = async (email, password, firstName, lastName, username) => {
    // encrypt password with md5 10 times
    for (let i = 0; i < 10; i += 1) {
      password = md5(password);
    }
    console.log(email, password, firstName, lastName, username);
    await axios.post('/auth/register', {
      username,
      email,
      password,
      firstName,
      lastName
    });
    dispatch({
      type: 'REGISTER'
      // payload: {
      // }
    });
  };

  const changePassword = async (oldPassword, newPassword) => {
    // encrypt password with md5 10 times
    for (let i = 0; i < 10; i += 1) {
      oldPassword = md5(oldPassword);
      newPassword = md5(newPassword);
    }
    await axios.post('/auth/change-password', {
      oldPassword,
      newPassword
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = async (username, phoneNumber, profileImage) => {
    const fd = new FormData();
    fd.append('username', username);
    fd.append('phoneNumber', phoneNumber);
    fd.append('profileImage', profileImage);
    // for (const file in arrayFiles) {
    //   fd.append('profileImage', file);
    // }
    const response = await axios.patch('/users', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const { metaData } = response.data;
    console.log(metaData);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        user: metaData
      }
    });
  };

  const verifyID = async (firstName, lastName, citizenId, phoneNumber) => {
    console.log(firstName, lastName, typeof citizenID, phoneNumber);
    const response = await axios.post('/users/verify-seller', {
      firstName,
      lastName,
      citizenId,
      phoneNumber
    });
    const { message } = response.data;
    console.log(message);
    const response2 = await axios.get('/users');
    const { metaData } = response2.data;
    console.log(metaData);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        user: metaData
      }
    });
  };

  const verifyEmail = async (verificationToken) => {
    console.log(verificationToken);
    const response = await axios.post('/auth/verify-email', {
      verificationToken
    });
    const { message } = response.data;
    console.log(message);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        verifyID,
        verifyEmail,
        changePassword,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
