import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreatePostComponent } from './components/pages/admin/posts/create-post/create-post.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './store/reducers';
import { CategoryEffect } from './store/effects/category.effects';
import { TagEffect } from './store/effects/tag.effects';
import { PostEffect } from './store/effects/post.effects';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { CategoryFormComponent } from './components/forms/category-form/category-form.component';
import { TagsComponent } from './components/pages/admin/tags/tags.component';
import { TagFormComponent } from './components/forms/tag-form/tag-form.component';
import { ListPostsComponent } from './components/pages/admin/posts/list-posts/list-posts.component';
import { EditPostComponent } from './components/pages/admin/posts/edit-post/edit-post.component';
import { PostFormComponent } from './components/forms/post-form/post-form.component';
import { FilesComponent } from './components/files/files.component';
import { FilesEffect } from './store/effects/files.effect';
import { ClientSidebarComponent } from './components/layout/client-sidebar/client-sidebar.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { PostDetailsComponent } from './components/pages/post-details/post-details.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { PostCommentFormComponent } from './components/forms/post-comment-form/post-comment-form.component';
import { AuthEffect } from './store/effects/auth.effects';
import { ListPostsByCategoryComponent } from './components/pages/list-posts-by-category/list-posts-by-category.component';
import { ListPostsByTagComponent } from './components/pages/list-posts-by-tag/list-posts-by-tag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from "@angular/material/paginator";
import {PaginatorModule} from "primeng/paginator"; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CreatePostComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesComponent,
    CategoryFormComponent,
    TagsComponent,
    TagFormComponent,
    ListPostsComponent,
    EditPostComponent,
    PostFormComponent,
    FilesComponent,
    ClientSidebarComponent,
    PostPreviewComponent,
    PostDetailsComponent,
    PostCommentComponent,
    PostCommentFormComponent,
    ListPostsByCategoryComponent,
    ListPostsByTagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EditorModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([CategoryEffect, TagEffect, PostEffect, FilesEffect, AuthEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MatPaginatorModule,
    PaginatorModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
