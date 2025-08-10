import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="admin-container"><h2>Admin Dashboard</h2><button (click)="logout()">Logout</button></div>`,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}
