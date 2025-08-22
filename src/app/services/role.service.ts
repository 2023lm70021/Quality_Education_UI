import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private role: string | null = null;
  private userId: string | null = null;

  setRole(role: string, userId: string) {
    this.role = role;
    this.userId = userId;
  }

  getRole(): string | null {
    return this.role;
  }

  getUserId(): string | null {
    return this.userId;
  }

  clear() {
    this.role = null;
    this.userId = null;
  }
}
