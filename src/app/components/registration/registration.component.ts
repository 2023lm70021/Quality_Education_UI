import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationData = {
    username: '',
    password: '',
    email: '',
    roleId: 2 // default to User
  };
  message = '';
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.loading = true;
    this.authService.register(this.registrationData).subscribe({
      next: (res) => {
        this.message = res.message || 'Registration successful!';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.message = err.error?.message || 'Registration failed!';
        this.loading = false;
      }
    });
  }
}
