import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SignupModalOpen: false,
  LoginModalOpen: false,
  LogoutModalOpen: false,
  CommandModalOpen: false,
  CommentPostDetails: {
    name: "",
    username: "",
    id: "",
    text: "",
  },
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignupModal: (state) => {
      state.SignupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.SignupModalOpen = false;
    },
    openLoginModal: (state) => {
      state.LoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.LoginModalOpen = false;
    },
    openLogoutModal: (state) => {
      state.LogoutModalOpen = true;
    },
    closeLogoutModal: (state) => {
      state.LogoutModalOpen = false;
    },
    openCommandModal: (state) => {
      state.CommandModalOpen = true;
    },
    closeCommandModal: (state) => {
      state.CommandModalOpen = false;
    },

    setCommentPostDetails: (state, action) => {
      state.CommentPostDetails.name = action.payload.name;
      state.CommentPostDetails.username = action.payload.username;
      state.CommentPostDetails.id = action.payload.id;
      state.CommentPostDetails.text = action.payload.text;
    },
  },
});

export const {
  setCommentPostDetails,
  openSignupModal,
  closeSignupModal,
  closeLoginModal,
  openLoginModal,
  openLogoutModal,
  closeLogoutModal,
  openCommandModal,
  closeCommandModal,
} = ModalSlice.actions;

export default ModalSlice.reducer;
