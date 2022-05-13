import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect

} from "firebase/auth";
import UserManager from '@/models/UserManager'
import { getGravatarURL } from "@/utils/misc";

import FirebaseAPIResponse from "@/types/FirebaseAPIResponse";

import app from './app'
import { UserToCreate } from "@/types/interfaces/User";

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

                await updateProfile(userCredential.user, { displayName, photoURL });

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

export const logInGooglePopUp = (): Promise<FirebaseAPIResponse> => {
    return signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Google user", user);
            
            // Look if user exists; if not create one
            const userExists = await UserManager.getByEmail(user.email!);

            if (!userExists) {
                const [created, newUser] = await UserManager.create({
                    email: user.email!,
                    username: user.displayName || undefined,
                })
                if (!created) {
                    
                    return {
                        error: "Could not create account for Google email",
                        success: null,
                    } as FirebaseAPIResponse
                }

                console.log("Created account in Mongo:", newUser);
            }

            const response: FirebaseAPIResponse = {
                error: null,
                success: 'Signed in with Google',
            }
            return response;

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            const response: FirebaseAPIResponse = {
                error: errorMessage,
                success: null,
            }
            return response;
        });
}


export const logInGoogle = () : Promise<FirebaseAPIResponse> => {
    return signInWithRedirect(auth, provider)
        .then((result) => {

            const response: FirebaseAPIResponse = {
                error: null,
                success: 'Signed in with Google',
            }
            return response;

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            const response: FirebaseAPIResponse = {
                error: errorMessage,
                success: null,
            }
            return response;
        });
}