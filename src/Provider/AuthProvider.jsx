import { createContext, useEffect, useState } from "react";
import app from "../firebase.init";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    // create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signin user with email and password
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //update user 
    const updateUser =(name, photo)=>{
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: photo
        })
    }

    //logout user
    const logOut =()=>{
        setLoading(false);
        return signOut(auth);
    }
    useEffect(()=>{
        const unSubScribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return () =>{
            return unSubScribe();
        }
    },[auth])

    const authFunction = { createUser, loginUser, user, updateUser, logOut };
    return (
        <AuthContext.Provider value={authFunction}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;