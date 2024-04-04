import { Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    { path: 'inicio', component: HomeComponent },
    { path: 'gastos', component: ExpenseListComponent },
    { path: 'gastos/nuevo', component: ExpenseFormComponent },
    { path: 'gastos/:id/editar', component: ExpenseFormComponent },
    { path: "", redirectTo: "inicio", pathMatch: 'full' },
    { path: "**", redirectTo: "gastos" }
];
