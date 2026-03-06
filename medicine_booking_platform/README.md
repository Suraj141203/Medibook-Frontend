# Medicine Booking Platform - Authentication Module

A modern, responsive authentication system for a medicine booking platform built with Angular 17 and Bootstrap 5.

## 🎨 Design Features

- **Distinctive UI Design**: Custom color schemes for each login type (User, Store, Admin)
- **Responsive Layout**: Mobile-first design that works seamlessly on all devices
- **Modern Animations**: Smooth transitions and micro-interactions
- **Form Validation**: Real-time validation with helpful error messages
- **Password Strength Indicator**: Visual feedback for password creation
- **Accessible**: WCAG compliant with proper ARIA labels

## 📦 Tech Stack

- **Angular**: 17.0.0
- **Bootstrap**: 5.3.2
- **Bootstrap Icons**: 1.11.1
- **TypeScript**: 5.2.2
- **RxJS**: 7.8.0

## 🏗️ Project Structure

```
medicine-booking-platform/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── user-login/
│   │   │   │   │   ├── user-login.component.ts
│   │   │   │   │   ├── user-login.component.html
│   │   │   │   │   └── user-login.component.css
│   │   │   │   ├── user-register/
│   │   │   │   │   ├── user-register.component.ts
│   │   │   │   │   ├── user-register.component.html
│   │   │   │   │   └── user-register.component.css
│   │   │   │   ├── store-login/
│   │   │   │   │   ├── store-login.component.ts
│   │   │   │   │   ├── store-login.component.html
│   │   │   │   │   └── store-login.component.css
│   │   │   │   └── admin-login/
│   │   │   │       ├── admin-login.component.ts
│   │   │   │       ├── admin-login.component.html
│   │   │   │       └── admin-login.component.css
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── models/
│   │   │   │   └── user.model.ts
│   │   │   ├── guards/
│   │   │   ├── auth.module.ts
│   │   │   └── auth-routing.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── styles.css
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Angular CLI (v17.0.0)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install Angular CLI globally** (if not already installed)
   ```bash
   npm install -g @angular/cli
   ```

3. **Run the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🎯 Features Implemented

### 1. User Login Page
- Email and password authentication
- Remember me functionality
- Password visibility toggle
- Social login options (Google, Facebook, Apple)
- Links to registration and other login types
- Beautiful gradient background with animations

### 2. User Registration Page
- Full name, email, phone number fields
- Password with strength indicator
- Confirm password validation
- Terms and conditions acceptance
- Real-time form validation
- Social registration options

### 3. Medical Store Login Page
- Store ID field
- Email and password authentication
- Store-specific branding (purple theme)
- Keep me signed in option
- Support information
- Feature highlights

### 4. Admin Login Page
- Admin code field for additional security
- Email and password (minimum 8 characters)
- Security indicators and monitoring notice
- Multi-factor authentication ready
- Emergency access information
- Dark theme with technical aesthetics

## 🎨 Color Schemes

### User Portal
- Primary: `#00A67E` (Medical Green)
- Gradient: Purple to Pink tones
- Background: Light and airy

### Store Portal
- Primary: `#7C3AED` (Purple)
- Gradient: Purple variations
- Background: Soft pastels

### Admin Portal
- Primary: `#0EA5E9` (Sky Blue)
- Background: Dark slate with blue accents
- Theme: Technical and secure

## 🔐 Authentication Service

The `AuthService` provides:
- `login()`: Authenticate users (simulated API call)
- `register()`: Register new users
- `logout()`: Clear session and redirect
- `isAuthenticated()`: Check login status
- `hasRole()`: Verify user role

Currently uses mock data with localStorage. Ready to integrate with real API endpoints.

## 📱 Responsive Design

- **Desktop** (1200px+): Full two-column layout with branding
- **Tablet** (768px - 1199px): Single column with adjusted spacing
- **Mobile** (< 768px): Optimized single column, stacked elements

## ✨ Validation Rules

### User Login
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### User Registration
- Full Name: Required, minimum 3 characters
- Email: Required, valid email format
- Phone: Required, 10 digits
- Password: Required, minimum 6 characters, must contain uppercase, lowercase, and number
- Confirm Password: Must match password
- Terms: Must be accepted

### Store Login
- Store ID: Required
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Admin Login
- Admin Code: Required, minimum 6 characters
- Email: Required, valid email format
- Password: Required, minimum 8 characters

## 🛠️ Development

### Adding New Components
```bash
ng generate component component-name
```

### Running Tests
```bash
ng test
```

### Building for Production
```bash
ng build --configuration production
```

## 🎭 Animations & Effects

- Fade-in animations on page load
- Slide-in animations for forms
- Hover effects on buttons and cards
- Floating background elements
- Smooth transitions on all interactive elements
- Password strength indicator animation

## 📋 Next Steps

After reviewing this authentication module, you can request:

1. **Dashboard Modules**: User, Store, Admin dashboards
2. **Medicine Search**: Search functionality with filters
3. **Shopping Cart**: Add to cart and checkout
4. **Order Management**: Booking and order tracking
5. **Store Management**: Inventory and order management
6. **Admin Panel**: User management, analytics, system settings

## 🤝 Contributing

This is a demonstration project. For production use:
1. Replace mock authentication with real API calls
2. Implement proper error handling
3. Add comprehensive testing
4. Set up CI/CD pipeline
5. Implement security best practices

## 📄 License

This project is for demonstration purposes.

## 👥 Author

Built with Angular 17 and Bootstrap 5 for the Medicine Booking Platform.

---

**Note**: This is the authentication module only. The complete application will include additional modules for the full booking system functionality.