import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'tmb-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  loginForm!: FormGroup;

  hidePassword = true;
  visible = true;

  startLoginInProcess: boolean = false;

  credentials!: Auth;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, ){}

  ngOnInit(): void{

    // let savedemail: any = this.getCookie("email");
    // let savedLogin: boolean = true;
    // if (savedemail == undefined || savedemail == null) {
    //   savedemail = '';
    //   savedLogin = false;
    // }

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
     // remember_login: [savedLogin]
    });
  }

  login() {

    this.startLoginInProcess = true;
    this.credentials = this.loginForm.value;

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.auth.login(this.credentials).subscribe({
        next: (response: any) => {
          const token = response.token;

          localStorage.setItem('token', token);

          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error('Authentication failed:', error);
          this.startLoginInProcess = false;
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
    this.visible = !this.visible;
  }

  getCookie(cookieName: string) {
    var cookieValue = undefined;
    var cookieArray = document.cookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
      var cookiePair = cookieArray[i].split("=");
      var name = cookiePair[0].trim();

      if (name === cookieName) {
        cookieValue = decodeURIComponent(cookiePair[1]);
        break;
      }
    }

    return cookieValue;
  }
}
