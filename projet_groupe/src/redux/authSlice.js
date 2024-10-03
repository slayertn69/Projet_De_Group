// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MyAxios from '../MyAxios'; // Importer l'intercepteur MyAxios

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, thunkAPI) => {
    const { username, password } = userCredentials;
    try {
      // Utilisation de MyAxios pour faire l'appel API au backend
      const response = await MyAxios.post('/login', { username, password });
      return response.data; // On suppose que la réponse contient { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Gérer les erreurs retournées par l'API
    }
  }
);

// Action asynchrone pour l'inscription
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userDetails, thunkAPI) => {
    const { username, password, email } = userDetails;
    try {
      // Utilisation de MyAxios pour faire l'appel API au backend
      const response = await MyAxios.post('/register', { username, password, email });
      return response.data; // On suppose que la réponse contient { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Gérer les erreurs retournées par l'API
    }
  }
);

// Slice Redux pour gérer l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      localStorage.removeItem('token'); // Optionnel : Suppression du token lors de la déconnexion
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion de l'état pour login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); // Stocker le token dans localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      // Gestion de l'état pour register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); // Stocker le token dans localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
