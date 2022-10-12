import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRuleComponent } from './add-rule/add-rule.component';
import { ProductListsComponent } from './product-lists/product-lists.component';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  {path: 'rules', component: RulesComponent},
  {path: 'products', component: ProductListsComponent},
  {path: 'add-rule', component: AddRuleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
