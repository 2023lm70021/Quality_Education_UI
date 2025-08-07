import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  message = '';
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.loading = true;
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.token) {
          localStorage.setItem('token', res.token);
          // You can decode the token here to get the role if needed
          this.router.navigate(['/home']);
        } else {
          this.message = 'Login failed: No token received.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.message || 'Login failed!';
      }
    });
  }
}
