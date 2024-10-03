// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simuler une fonction d'authentification (API fictive)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, thunkAPI) => {
    const { username, password } = userCredentials;
    
    const response = await fetch('http://localhost:3005/api/users/login', { // Remplace cette URL par l'API réelle de connexion
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return data; // Retourne les données utilisateur
    } else {
      return thunkAPI.rejectWithValue(data); // Retourne l'erreur si la connexion échoue
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userCredentials, thunkAPI) => {
    const { username, password } = userCredentials;

    const response = await fetch('http://localhost:3005/api/users/register', { // Remplace cette URL par l'API réelle d'enregistrement
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return data; // Retourne les données utilisateur après l'enregistrement
    } else {
      return thunkAPI.rejectWithValue(data); // Retourne l'erreur si l'enregistrement échoue
    }
  }
);

// Création du slice pour gérer l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Informations de l'utilisateur
    token: null, // Jeton d'authentification (si nécessaire)
    status: 'idle', // idle | loading | succeeded | failed
    error: null, // Stocke les erreurs potentielles
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; // Assurez-vous que l'API renvoie `user`
        state.token = action.payload.token; // Si l'API renvoie un jeton
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; // Assurez-vous que l'API renvoie `user`
        state.token = action.payload.token; // Si l'API renvoie un jeton
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
