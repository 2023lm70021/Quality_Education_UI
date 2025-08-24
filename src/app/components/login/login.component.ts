import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';

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

  constructor(private router: Router, private authService: AuthService, private roleService: RoleService) {}

  onSubmit() {
    this.loading = true;
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.token) {
          localStorage.setItem('token', res.token);
          // Decode JWT to get role and userId
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          const userId = payload['UserId'];
          this.roleService.setRole(role, userId);
          // Redirect based on role
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'User') {
            this.router.navigate(['/home']);
          } else if (role === 'Teacher') {
            this.router.navigate(['/teacher']);
          } else {
            this.message = 'Unknown role.';
          }
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
