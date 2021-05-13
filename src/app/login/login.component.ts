import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hardUsername = 'Pelda';
  hardPassword = 'asd123';
  username;
  password;


  constructor(
   public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  doLogin(): void{
    if(this.username === this.hardUsername && this.password === this.hardPassword){
      this.loginService.isLoggedIn = true;
      alert('Sikeresen Bejelentkeztél!');
      return;
    }
    this.loginService.isLoggedIn = false;
    alert('Sikertelen bejelentkezés!');
  }
}
