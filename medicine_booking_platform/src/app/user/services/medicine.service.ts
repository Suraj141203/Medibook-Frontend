import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Medicine {
  id: string;
  storeId: string;
  name: string;
  description: string;
  category: string;
  manufacturer: string;
  price: number;
  discountPrice?: number;
  stock: number;
  inStock: boolean;
  prescriptionRequired: boolean;
  dosage?: string;
  imageUrl: string;
  expiryDate: string;
  rating: number;
  reviewCount: number;
  prescription?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = `${environment.apiUrl}/medicines`;

  constructor(private http: HttpClient) {}

  getAllMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.apiUrl);
  }

  getMedicineById(id: string): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.apiUrl}/${id}`);
  }

  searchMedicines(keyword: string): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  getMedicinesByCategory(category: string): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.apiUrl}/category/${category}`);
  }

  // ✅ NEW METHODS
  getFeaturedMedicines(): Observable<Medicine[]> {
    // Get first 8 medicines as featured
    return this.http.get<Medicine[]>(`${this.apiUrl}`);
  }

  getCategories(): Observable<string[]> {
    // Return predefined categories
    return of([
      'Pain Relief',
      'Antibiotics',
      'Allergy',
      'Vitamins',
      'Cardiovascular',
      'Diabetes',
      'Digestive Health',
      'Other'
    ]);
  }
}