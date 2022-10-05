import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { WallpaperComponent } from './pages/wallpaper/wallpaper.component';
import { AboutgComponent } from './pages/aboutg/aboutg.component';
import { WarrantyComponent } from './pages/warranty/warranty.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewComponent } from './pages/new/new.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './pages/blog/blog.component';
import { DetailblogComponent } from './pages/detailblog/detailblog.component';
import { DetailnewComponent } from './pages/detailnew/detailnew.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UserIComponent } from './pages/user-i/user-i.component';
import { UserSettingComponent } from './pages/user-setting/user-setting.component';
import { PasswordComponent } from './pages/password/password.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    WallpaperComponent,
    AboutgComponent,
    WarrantyComponent,
    ContactComponent,
    NewComponent,
    BlogComponent,
    DetailblogComponent,
    DetailnewComponent,
    HomeComponent,
    UserIComponent,
    UserSettingComponent,
    PasswordComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
