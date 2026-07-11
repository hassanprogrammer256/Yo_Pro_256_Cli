import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { loginUser, registerstudent, user_profile } from "../api";


export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
    
      if (response.access && response.refresh){
return response;
      }
      
    } catch (error) {
      return rejectWithValue({"Error": error.message || "Invalid Credentials"});
    }
  }
);

export const registerStudent = createAsyncThunk("auth/register",async(data) => {
  return await registerstudent(data);
;})

export const user =  createAsyncThunk("auth/me",async() => {
  return await user_profile();
})


const authSlice = createSlice({
name:"auth",
initialState:{
user:null,
access:localStorage.getItem("access"),
loading:false},

reducers:{
logout:(state)=>{localStorage.clear();state.user = null;}},
extraReducers:(builder)=>{
    builder
  .addCase(login.pending,(state)=>{state.loading = true;})
  .addCase(login.rejected,(state)=>{state.loading = false;})

  .addCase(login.fulfilled,(state,action)=>{

        state.loading = false;
        state.access =action.payload.access;
        localStorage.setItem("access",action.payload.access);
        localStorage.setItem("refresh",action.payload.refresh);})

  .addCase(registerStudent.fulfilled,(state) => {state.loading = false;})

  .addCase(registerStudent.pending,(state) => {
        state.loading = true;
      })

  .addCase(user.pending,(state) => state.loading = true)

  .addCase(user.fulfilled,(state,action) => {
    state.loading = false;
    state.user = action.payload?.user;
  })

  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;