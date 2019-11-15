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
     this.authService.isUserLogged()
    .subscribe(d=>{
      if(d){
        this.isUserPresent = true
      }
      else{
        this.isUserPresent = false
      }     
     })
  }
  Logout() {
    this.authService.SignOut()
      .then(() => console.log('user logged out'))
  }
}
