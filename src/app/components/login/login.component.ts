import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private fms: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  // onSubmit() {
  //   this.auth.login(this.email, this.password)
  //     .then(res => {
  //       this.fms.show('You are now logged in', {
  //         cssClass: 'alert-success', timeout: 4000
  //       });
  //       this.router.navigate(['/']);
  //     })
  //     .catch(err => {
  //       this.fms.show(err.message, {
  //         cssClass: 'alert-danger', timeout: 4000
  //       });
  //     });
  // }
  async onSubmit() {
    try {
      await this.authService.login(this.email, this.password);
      await this.fms.show('You are now logged in', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/']);
    } catch (error) {
      this.fms.show(error.message, {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    }
  }
}
