import {initializeApp } from 'firebase/app'
import {getAuth,
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA78J8dPgPjH1VfJSZccyzViZwsS2nBVno",
    authDomain: "shop-9362e.firebaseapp.com",
    projectId: "shop-9362e",
    storageBucket: "shop-9362e.appspot.com",
    messagingSenderId: "204226526751",
    appId: "1:204226526751:web:afdd5f3e641db8017ddf2a",
    measurementId: "G-P5FSY4VYGE"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log('error creating the user', error);
        }
    } 
    
    return userDocRef;
   
}

export const createAuthUserWithEmailAndPassword = async() => {

    
}
