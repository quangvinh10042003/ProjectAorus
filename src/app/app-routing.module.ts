import { PcBuildingComponent } from './pages/pc-building/pc-building.component';
import { CompareComponent } from './pages/compare/compare.component';
import { ShopComponent } from './pages/shop/shop.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"shop/:id",component:ShopComponent},
  {path:"shop",component:ShopComponent},
  {path:"compare",component:CompareComponent},
  {path:"pcBuilding",component:PcBuildingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
