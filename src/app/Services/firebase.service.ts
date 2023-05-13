import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
	Auth,
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	User,
	UserCredential,
} from 'firebase/auth';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class FirebaseService {
	firebase: FirebaseApp | undefined;
	auth: Auth | undefined;
	analytics: Analytics | undefined;
	user: User | undefined;

	constructor() {}

	initFirebase(): FirebaseApp {
		this.firebase = initializeApp(environment.firebase);
		this.auth = getAuth(this.firebase);
		this.analytics = getAnalytics(this.firebase);
		return this.firebase;
	}

	authenticate(): Promise<void | User> {
		return createUserWithEmailAndPassword(
			this.auth!,
			'wahab_anjum@hotmail.com',
			'kof20000'
		)
			.then((userCredential) => {
				console.log(this.analytics);
				return (this.user = userCredential.user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	}

	signInWithGoogle(): Promise<void | UserCredential> {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(this.auth!, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential =
				GoogleAuthProvider.credentialFromResult(result);
				const token = credential!.accessToken;
				// The signed-in user info.
				const user = result.user;
				return result
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential =
					GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}
}
