import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { User } from 'src/app/shared/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { CommentsService } from '../../shared/services/comments.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginObj: User;
  loginForm: FormGroup;

  constructor(
    private api: UsersService,
    private form: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginObj = new User();
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.loginObj = {
        userId: 0,
        username: '',
        emailId: formData.email,
        password: formData.password,
        roleId: 0,
        access: '',
      };

      this.api.loginUser(this.loginObj).subscribe({
        next: (res: {
          message: string;
          email: string;
          authToken: string;
          access: string;
        }) => {
          console.log(res);
          alert(res.message);
          sessionStorage.setItem('token', res.authToken);
          sessionStorage.setItem('role', res.access);
          if (res.authToken) {
            this.router.navigate(['/projects']);
          }
        },
        error: (err: Error) => {
          console.log('error');
        },
        complete: () => {
          console.log('complete');
        },
      });
    } else {
      console.log('Invalid Form');
    }
  }
}
