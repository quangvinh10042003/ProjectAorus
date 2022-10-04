import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AboutgComponent } from './pages/aboutg/aboutg.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DetailblogComponent } from './pages/detailblog/detailblog.component';
import { DetailnewComponent } from './pages/detailnew/detailnew.component';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';
import { UserIComponent } from './pages/user-i/user-i.component';
import { WallpaperComponent } from './pages/wallpaper/wallpaper.component';
import { WarrantyComponent } from './pages/warranty/warranty.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "wallpaper", component: WallpaperComponent },
  { path: "aboutg", component: AboutgComponent },
  { path: "warranty", component: WarrantyComponent },
  { path: "contact", component: ContactComponent },
  { path: "new", component: NewComponent },
  { path: "blog", component: BlogComponent },
  { path: "detailBlog/:id", component: DetailblogComponent },
  { path: "new/:id", component: DetailnewComponent },
  { path: "user/:id", component: UserIComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
