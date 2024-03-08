import { Component } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { LoginComponent } from '../login/login.component';
import { User } from 'src/app/shared/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loginObj: User;
  registerForm: FormGroup;

  constructor(private api: UsersService, private form: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.form.group({
      userName: ['', Validators.required, Validators.minLength(3)],
      emailID: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(2)],
      userAccess: ['', Validators.required]
    });

    this.loginObj = new User();
  }
  get formControls() {
    return this.registerForm.controls;
  }

  registerUser(event: FormGroup): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.loginObj = {
      userId: 0,
      username: event.value.userName,
      emailId: event.value.emailID,
      password: event.value.password,
      roleId: 0,
      access: event.value.userAccess,
    };

    this.api.createUser(this.loginObj).subscribe({
      next: (res: User) => {
        alert('User Registered!');
        event.reset();
        this.router.navigate(['/login']);
      },
      error: (err: Error) => {
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

}
