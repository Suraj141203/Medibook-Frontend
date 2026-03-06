import { Component, OnInit } from '@angular/core';
import { MedicineService, Medicine } from '../../services/medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {

  medicines: Medicine[] = [];
  filteredMedicines: Medicine[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  searchTerm: string = '';
  loading = false;

  // ✅ Added variables
  searchQuery = "";
  sortBy = "";

  sortOptions = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" }
  ];
getResultsText() {
  return `${this.filteredMedicines.length} medicines found`;
}

  constructor(private medicineService: MedicineService) {}

  

  ngOnInit(): void {
    this.loadCategories();
    this.loadMedicines();
  }

  loadCategories(): void {
    this.medicineService.getCategories().subscribe((categories: string[]) => {
      this.categories = ['All', ...categories];
    });
  }

  loadMedicines(): void {
    this.loading = true;
    this.medicineService.getAllMedicines().subscribe((medicines: Medicine[]) => {
      this.medicines = medicines;
      this.filteredMedicines = medicines;
      this.loading = false;
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.medicines;

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(m => m.category === this.selectedCategory);
    }

    if (this.searchTerm) {
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredMedicines = filtered;
  }

  // ✅ Added functions

  clearSearch() {
    this.searchQuery = "";
  }

  onSearchChange() {}

  onSortChange() {}

  onCategoryChange(category: string) {}

  addToCart(medicine: any, event: Event) {
    event.stopPropagation();
  }

}