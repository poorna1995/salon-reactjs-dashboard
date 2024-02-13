import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC3uLoSA0WT39U8UvqI8dZYBKmO95ikOoc",
  authDomain: "hivepath-booking.firebaseapp.com",
  projectId: "hivepath-booking",
  storageBucket: "hivepath-booking.appspot.com",
  messagingSenderId: "541575125587",
  appId: "1:541575125587:web:9fc6527725e912aebfc4a6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
// window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

export const recaptcha = RecaptchaVerifier;
export const signIn = signInWithPhoneNumber;


// export default { auth, RecaptchaVerifier, signInWithPhoneNumber };
