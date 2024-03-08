import { NgModule, createComponent, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CreateComponent } from './components/create/create.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UsersComponent } from './admin/users/users.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { BugsComponent } from './admin/bugs/bugs.component';
import { BugCommentComponent } from './components/bug-comment/bug-comment.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  
  {
    path: 'dashboard/:projectId',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  
  {
    path: 'portfolio',
    component: PortfolioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'bugs',
    component: BugsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'dashboard/:projectId/bugComment/:bugId',
    component: BugCommentComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
