import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  SignInWithUser(name,password){

  }

  onSignInWithProvider(provider: string) {
    switch (provider) {
      case 'facebook':
        this.authService.FacebookAuth()
        break
      case 'google':
        this.authService.GoogleAuth()
        break
      case 'twitter':
        this.authService.TwitterAuth()
        break
        defauft:
        console.log(`provider ${provider} not supported`)
    }

  }
}
