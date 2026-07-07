import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { loginUser }
from "./authAPI";

export const login = createAsyncThunk(

  "auth/login",

  async(data)=>{

    return await loginUser(data);
  }
);

const authSlice = createSlice({

  name:"auth",

  initialState:{

    user:null,

    access:
      localStorage.getItem("access"),

    loading:false,
  },

  reducers:{

    logout:(state)=>{

      localStorage.clear();

      state.user = null;
    }
  },

  extraReducers:(builder)=>{

    builder

      .addCase(
        login.pending,
        (state)=>{

          state.loading = true;
        }
      )

      .addCase(
        login.fulfilled,
        (state,action)=>{

          state.loading = false;

          state.access =
            action.payload.access;

          localStorage.setItem(
            "access",
            action.payload.access
          );

          localStorage.setItem(
            "refresh",
            action.payload.refresh
          );
        }
      );
  }
});

export const { logout } =
authSlice.actions;

export default authSlice.reducer;