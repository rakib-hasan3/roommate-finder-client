import React, { useEffect, useState } from "react";
import { AuthContexts } from "./AuthContexts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Create account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user)); // optional persist
        return res;
      });
  };

  // ✅ Logout user
  const logOutUser = () => {
    return signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  // ✅ Keep user logged in (even after reload)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    createUser,
    loginUser,
    logOutUser,
    loading,
  };

  return (
    <AuthContexts.Provider value={userInfo}>
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
