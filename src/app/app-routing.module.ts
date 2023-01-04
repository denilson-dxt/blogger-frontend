import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/pages/admin/posts/create-post/create-post.component';
import { EditPostComponent } from './components/pages/admin/posts/edit-post/edit-post.component';
import { ListPostsComponent } from './components/pages/admin/posts/list-posts/list-posts.component';
import { TagsComponent } from './components/pages/admin/tags/tags.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ListPostsByCategoryComponent } from './components/pages/list-posts-by-category/list-posts-by-category.component';
import { ListPostsByTagComponent } from './components/pages/list-posts-by-tag/list-posts-by-tag.component';
import { PostDetailsComponent } from './components/pages/post-details/post-details.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "posts/:slug", component:PostDetailsComponent},
  {path: "category/:categorySlug", component: ListPostsByCategoryComponent},
  {path: "tag/:tagDescription", component: ListPostsByTagComponent},
  {path: "auth/login", component: LoginComponent},
  {path: "auth/register", component: RegisterComponent},
  {path: "admin", component:DashboardComponent},
  {path: "admin/posts", component: ListPostsComponent},
  {path: "admin/posts/create", component: CreatePostComponent},
  {path: "admin/posts/edit/:id", component: EditPostComponent},
  {path: "admin/categories", component:CategoriesComponent},
  {path: "admin/tags", component: TagsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
