import { Component, inject } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { FirebaseService } from './Services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecoThreads';
  fbService = inject(FirebaseService);
  user: UserCredential | undefined
	
  login() {
		this.fbService.signInWithGoogle().then(usr => this.user = usr!);
	}
}
