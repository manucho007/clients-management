import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fms: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    try {
      await this.authService.register(this.email, this.password);
      await this.fms.show('You are now registered and logged in', {
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
