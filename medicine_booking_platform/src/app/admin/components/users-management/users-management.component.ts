import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { PlatformUser } from '../../models/admin.model';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html'
})
export class UsersManagementComponent implements OnInit {
  users: PlatformUser[] = [];
  filteredUsers: PlatformUser[] = [];
  searchTerm = '';
  roleFilter = 'all';
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
      this.loading = false;
    });
  }

  applyFilters() {
    let filtered = [...this.users];
    
    if (this.roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === this.roleFilter);
    }
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(u =>
        u.fullName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      );
    }
    
    this.filteredUsers = filtered;
  }

  toggleStatus(userId: string, userName: string) {
    if (confirm(`Toggle status for ${userName}?`)) {
      this.adminService.toggleUserStatus(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  deleteUser(userId: string, userName: string) {
    if (confirm(`Delete user "${userName}"? This action cannot be undone.`)) {
      this.adminService.deleteUser(userId).subscribe(() => {
        alert('User deleted successfully');
        this.loadUsers();
      });
    }
  }

  getRoleBadge(role: string): string {
    const badges: any = {
      'user': 'bg-primary',
      'store': 'bg-warning text-dark',
      'admin': 'bg-danger'
    };
    return badges[role] || 'bg-secondary';
  }
}