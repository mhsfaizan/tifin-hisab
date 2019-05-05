import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private _authSer: AuthenticationService, private _router: Router) {
  }
  signForm: FormGroup;
  isLoggedIn = false;
  ngOnInit() {
    this._authSer.isLoggedIn()  ? this._router.navigate(['/dashboard']) : "";
    this.signForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
  signin() {
    this.isLoggedIn = true;
    this._authSer.login(this.signForm.value)
      .then((resp: any) => {
        this.isLoggedIn = false;
        console.log(resp);
        this._authSer.showToast("Succesfully signed in.", "success");
        setTimeout(() => {
          this._router.navigate(["/dashboard"])
        }, 2500);
      })
      .catch((err) => {
        this.isLoggedIn = false;
        console.log(err);
        this._authSer.showToast(err.message, "danger");
      })
  }
  
}
