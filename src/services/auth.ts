import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification,
    GoogleAuthProvider
} from "firebase/auth";

import { getGravatarURL } from "@/utils/misc";

import FirebaseAPIResponse from "@/types/FirebaseAPIResponse";

import app from './app'

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
auth.useDeviceLanguage();

// Functions that return a Promise must be Awaited

export const newUser = (email: string, password: string): Promise<FirebaseAPIResponse> => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then( 
            async (userCredential) => {
                // Signed in 
                console.log("userCredential");
                console.dir(userCredential);

                // Set Name and PhotoURL
                const displayName = email.split('@')[0]
                const photoURL = getGravatarURL(email);

                await updateProfile(userCredential.user, {displayName, photoURL});

                // send email verification
                try {
                    await sendEmailVerification(auth.currentUser!);
                } catch {
                    console.error("Could not send verification email to", auth.currentUser);
                }

                const response: FirebaseAPIResponse = {
                    error: null,
                    success: 'Signed in succesfully'
                }
                return response;
        })
        .catch((error) => {
            const { code, message } = error;

            const response: FirebaseAPIResponse = {
                error: code,
                success: null
            }
            return response;
        });
}


export const logIn = (email: string, password: string): Promise<FirebaseAPIResponse> => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log("userCredential");
            console.dir(userCredential);

            const response: FirebaseAPIResponse = {
                error: null,
                success: 'Signed in succesfully'
            }
            return response;
        })
        .catch((error) => {
            const { code, message } = error;

            const response: FirebaseAPIResponse = {
                error: message + ' (' + code + ')',
                success: null
            }
            return response;

        });
}

export const logOut = (): Promise<FirebaseAPIResponse> => {
    return signOut(auth).then(() => {
        // Sign-out successful.
        const response: FirebaseAPIResponse = {
            error: null,
            success: 'Logged out',
        }
        return response;

    }).catch((error) => {
        // An error happened.
        const response: FirebaseAPIResponse = {
            error: JSON.stringify(error),
            success: null,
        }
        return response;
    });
}