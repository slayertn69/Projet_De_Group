import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MyAxios from '../MyAxios'; 

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, thunkAPI) => {
    const { username, password } = userCredentials;
    try {
      const response = await MyAxios.post('/login', { username, password });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userDetails, thunkAPI) => {
    const { username, password, email } = userDetails;
    try {
      const response = await MyAxios.post('/register', { username, password, email });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);


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
      localStorage.removeItem('token'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); 
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
