import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { StoreMedicine } from '../../models/store.model';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  medicines: StoreMedicine[] = [];
  filteredMedicines: StoreMedicine[] = [];
  searchTerm = '';
  loading = true;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.loadMedicines();
  }

  loadMedicines() {
    this.storeService.getMedicines().subscribe(medicines => {
      this.medicines = medicines;
      this.filteredMedicines = medicines;
      this.loading = false;
    });
  }

  searchMedicines() {
    const term = this.searchTerm.toLowerCase();
    this.filteredMedicines = this.medicines.filter(m =>
      m.name.toLowerCase().includes(term) ||
      m.category.toLowerCase().includes(term) ||
      m.manufacturer.toLowerCase().includes(term)
    );
  }

  getStockClass(stock: number): string {
    if (stock < 10) return 'text-danger fw-bold';
    if (stock < 50) return 'text-warning fw-bold';
    return 'text-success fw-bold';
  }

  deleteMedicine(id: string, name: string) {
    if (confirm(`Delete "${name}"? This action cannot be undone.`)) {
      this.storeService.deleteMedicine(id).subscribe(() => {
        alert('Medicine deleted successfully');
        this.loadMedicines();
      });
    }
  }

  updateStock(medicine: StoreMedicine) {
    const newStock = prompt(`Update stock for "${medicine.name}"\n\nCurrent Stock: ${medicine.stock}\n\nEnter new stock quantity:`, medicine.stock.toString());
    if (newStock && !isNaN(parseInt(newStock))) {
      this.storeService.updateStock(medicine.id, parseInt(newStock)).subscribe(() => {
        alert('Stock updated successfully');
        this.loadMedicines();
      });
    }
  }
}