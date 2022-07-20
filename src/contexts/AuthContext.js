import { createContext, useContext, useEffect, useState } from 'react';

import {auth} from '../firebase'

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password,username) => {
    return auth.createUserWithEmailAndPassword( email, password)
    .then((authUser)=>{
        return authUser.user.updateProfile({
            displayName:username
        })
    })
    .catch(err=>alert(err.message))
  };

   const signIn = (email, password) =>  {
    return auth.signInWithEmailAndPassword( email, password)
   }

  const logout = () => {
      return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged( (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};