import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login';
  isUserPresent: boolean = false
  constructor(public authService: AuthService) {
    this.isUserPresent = false

  }

  ngOnInit() {
    this.authService.isUserLoggedIn.subscribe(status => {
      this.isUserPresent = status
    })
  }
  Logout() {
    this.authService.SignOut()
      .then(() => console.log('user logged out'))
  }
}
