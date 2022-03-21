import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import FirebaseAPIResponse from "@/types/FirebaseAPIResponse";

const auth = getAuth();

// Functions that return a Promise must be Awaited

export const newUser = (email: string, password: string): Promise<FirebaseAPIResponse> => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log("userCredential");
            console.dir(userCredential);
            let response: FirebaseAPIResponse = {
                error: null,
                success: 'Signed in succesfully'
            }
            return response;
        })
        .catch((error) => {
            const { code, message } = error;

            let response: FirebaseAPIResponse = {
                error: message + ' (' + code + ')',
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

            let response: FirebaseAPIResponse = {
                error: null,
                success: 'Signed in succesfully'
            }
            return response;
        })
        .catch((error) => {
            const { code, message } = error;

            let response: FirebaseAPIResponse = {
                error: message + ' (' + code + ')',
                success: null
            }
            return response;

        });
}

export const logOut = (): Promise<FirebaseAPIResponse> => {
    return signOut(auth).then(() => {
        // Sign-out successful.
        let response: FirebaseAPIResponse = {
            error: null,
            success: 'Logged out',
        }
        return response;

    }).catch((error) => {
        // An error happened.
        let response: FirebaseAPIResponse = {
            error: JSON.stringify(error),
            success: null,
        }
        return response;
    });
}