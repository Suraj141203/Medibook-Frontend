import { Component } from '@angular/core';

@Component({
  selector: 'app-store-layout',
  template: `
    <app-store-navbar></app-store-navbar>
    <div class="content-wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .content-wrapper {
      min-height: calc(100vh - 80px);
      background: #f8f9fa;
    }
  `]
})
export class StoreLayoutComponent {}