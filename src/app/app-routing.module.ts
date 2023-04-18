import { PcBuildingComponent } from './pages/pc-building/pc-building.component';
import { CompareComponent } from './pages/compare/compare.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HistoryComponent } from './pages/history/history.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
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
import { PasswordComponent } from './pages/password/password.component';
import { UserIComponent } from './pages/user-i/user-i.component';
import { UserSettingComponent } from './pages/user-setting/user-setting.component';
import { WallpaperComponent } from './pages/wallpaper/wallpaper.component';
import { WarrantyComponent } from './pages/warranty/warranty.component';
import { SpinnerComponent } from './layouts/spinner/spinner.component';

const routes: Routes = [
  { path: "shop/:id", component: ShopComponent },
  { path: "shop", component: ShopComponent },
  { path: "compare", component: CompareComponent },
  { path: "pcBuilding", component: PcBuildingComponent },
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
  { path: "user", component: UserIComponent },
  { path: "usersetting", component: UserSettingComponent },
  { path: "password", component: PasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'cart', component: CartComponent },
  { path: 'spinner', component: SpinnerComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
