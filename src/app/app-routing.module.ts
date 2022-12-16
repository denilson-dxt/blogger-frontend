import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/pages/admin/create-post/create-post.component';
import { TagsComponent } from './components/pages/admin/tags/tags.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "auth/login", component: LoginComponent},
  {path: "auth/register", component: RegisterComponent},
  {path: "admin", component:DashboardComponent},
  {path: "admin/posts/create", component: CreatePostComponent},
  {path: "admin/categories", component:CategoriesComponent},
  {path: "admin/tags", component: TagsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
