import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userErr: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      return { currentUser: action.payload, userErr: [] };
    },

    signOutUserSuccess: () => {
      return initialState;
    },

    userError: (err) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  resetUserState,
  setCalendarSyncedEmails,
  setGoogleMeetEmail,
  setMyReferralLink,
  setProfilePicURL,
  setResetPasswordToken,
  setSyncedEmailsFetch,
  setUserPreferences,
  signInSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signUpUserStart,
  userError,
} = userSlice.actions;

export default userSlice.reducer;
