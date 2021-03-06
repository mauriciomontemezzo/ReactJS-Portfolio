import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDq8tICKbhv7evKNvN684h51SGsg-TIml4",
    authDomain: "site-loja-2f93f.firebaseapp.com",
    projectId: "site-loja-2f93f",
    storageBucket: "site-loja-2f93f.appspot.com",
    messagingSenderId: "60297462906",
    appId: "1:60297462906:web:645fcc2bfc6df98c6427c3"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const  signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const creatAd = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                creatAd,
                additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    // id user data does not exist 
    // create/ set the document with the data from usersAuth in my collection

    // if user data exists
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
};