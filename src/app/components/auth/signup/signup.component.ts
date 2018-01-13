import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../-services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})

export class SignupComponent implements OnInit {

  temp_name = '';
  temp_email = '';
  temp_pass = '';
  temp_pass_rep = '';

  // Default avatar
  avatar_def = '../../assets/img/avatar_def.jpg';

  constructor(
    private _authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signUp() {
    if (!this.temp_name || !this.temp_email || !this.temp_pass || !this.temp_pass_rep) {
      console.log('Fill inpits');
    }
    else {

      if (this.temp_pass != this.temp_pass_rep) {
        console.log('Passwords are not same');
      }
      else {

        let newUser = {
          name: this.temp_name,
          email: this.temp_email,
          password: this.temp_pass,
          avatar: this.avatar_def
        }

        this._authservice.x_signUp(newUser)
          .subscribe(res => {
            // console.log(res.msg);
            if (res.success) {
              this.resetForm('all');
              this.router.navigate(['login']);
            }
            else {
              this.resetForm('');
            }
          })
      }
    }
  }

  resetForm(a) {
    if (a == 'all') {
      this.temp_name = '';
    }
    this.temp_email = '';
    this.temp_pass = '';
    this.temp_pass_rep = '';
  }

}
