import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FirebaseApp } from 'firebase/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './Services/firebase.service';
import { BottomBarComponent } from './Components/bottom-bar/bottom-bar.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';

// Initialize Firebase app in app_initializer
export function initFirebase(fb: FirebaseService): () => FirebaseApp {
  return () => fb.initFirebase();
}
@NgModule({
  declarations: [AppComponent, BottomBarComponent, LoginComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFirebase,
      multi: true,
      deps: [FirebaseService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
