import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardGuard],
    loadChildren: './dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'add-item',
    canActivate: [AuthGuardGuard],
    loadChildren: './add-item/add-item.module#AddItemPageModule'
  },
  {
    path: 'calendar',
    canActivate: [AuthGuardGuard],
    loadChildren: './calendar/calendar.module#CalendarPageModule'
  },
  {
    path: 'transaction',
    canActivate: [AuthGuardGuard],
    loadChildren: './transaction/transaction.module#TransactionPageModule'
  },
  { path: 'edit-calendar/:date/:involved/:tiffin', loadChildren: './edit-calendar/edit-calendar.module#EditCalendarPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
