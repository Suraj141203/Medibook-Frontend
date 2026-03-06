import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {
  medicineForm!: FormGroup;
  categories = ['Pain Relief', 'Antibiotics', 'Allergy', 'Vitamins', 'Cardiovascular', 'Diabetes', 'Digestive Health', 'Other'];
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.medicineForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      manufacturer: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      prescription: [false],
      expiryDate: ['', Validators.required],
      imageUrl: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400']
    });
  }

  get f() { return this.medicineForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.medicineForm.invalid) {
      alert('Please fill all required fields correctly');
      return;
    }
    
    this.loading = true;
    this.storeService.addMedicine(this.medicineForm.value).subscribe({
      next: () => {
        alert('Medicine added successfully!');
        this.router.navigate(['/store/medicines']);
      },
      error: () => {
        this.loading = false;
        alert('Failed to add medicine');
      }
    });
  }
}