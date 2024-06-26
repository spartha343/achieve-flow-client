import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();

  const googleSignInWithPopUp = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signUpWithEmailAndPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signTheUserOut = () => signOut(auth);

  useEffect(() => {
    const unSubscribe = () => {
      onAuthStateChanged(auth, (currentUser) => {
        setIsLoading(false);
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      });
    };
    return () => unSubscribe();
  }, [auth]);

  const authInfo = {
    signUpWithEmailAndPass,
    signInWithEmailAndPass,
    googleSignInWithPopUp,
    signTheUserOut,
    user,
    isLoading
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
