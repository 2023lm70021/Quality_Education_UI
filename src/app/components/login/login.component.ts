import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Hardcoded user type logic
    const { username, password } = this.loginData;
    if (username && password) {
      if (username.toLowerCase() === 'teacher') {
        this.router.navigate(['/teacher']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }
}
