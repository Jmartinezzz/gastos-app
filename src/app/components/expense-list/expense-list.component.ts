import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import Toastify from 'toastify-js'

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  total: number = 0;

  constructor(
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.loadDataIntoTable();
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe((res) => {
      this.showSuccessToast('Gatos Eliminado');
      this.expenses = this.expenses.filter(expense => expense.id !== id);
      this.calculateTotal();
    });
  }

  private loadDataIntoTable(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.calculateTotal();
    })
  }

  private calculateTotal(): void {
    this.total = this.expenses.reduce((acc, currentValue) => {
      return acc + Number(currentValue.amount);
    }, 0)
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
