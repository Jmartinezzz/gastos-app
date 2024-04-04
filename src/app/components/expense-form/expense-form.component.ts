import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Toastify from 'toastify-js'

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent implements OnInit {

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDataIntoForm();
  }

  expenseForm: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    amount: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    expense_date: new FormControl('', [Validators.required]),
  });

  expenseId? : number;

  saveExpense(): void {
    if (this.expenseId) {
      this.expenseService.updateExpense(this.expenseId, this.expenseForm.value)
        .subscribe(expense => {
          this.showSuccessToast('Gasto acualizado con exito');
          this.router.navigateByUrl('gastos');
        })
    } else {
      this.expenseService.createExpense(this.expenseForm.value).subscribe(expense => {
        this.showSuccessToast('Gasto agregado con exito');
        this.router.navigateByUrl('gastos');
      });
    }
  }

  hasError(field: string): boolean {
    const errors = this.getErrorsArray(field);

    if(errors.length && (this.expenseForm.get(field)?.touched || this.expenseForm.get(field)?.dirty)) {
      return true;
    }

    return false;
  }

  getCurrentError(field: string): string {
    const errors = this.getErrorsArray(field);

    if(!errors) {
      return '';
    }

    return errors[0];
  }

  getFormTitle(): string {
    return this.expenseId ? 'Editar gasto' : 'Nuevo gasto';
  }

  private getErrorsArray(field: string): string[] {
    const errorsObj = this.expenseForm.get(field)?.errors ?? {};
    return Object.keys(errorsObj);
  }

  private loadDataIntoForm(): void {
    this.expenseId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.expenseId) {
      this.expenseService.getExpense(this.expenseId).subscribe(expense => {
        this.expenseForm.patchValue(expense);
      });
    }
  }

  private showSuccessToast(message: string): void {
    Toastify({
      text: message,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#189586"
      }
    }).showToast();
  }
}
