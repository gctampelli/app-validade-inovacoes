import { Routes } from '@angular/router';
import { RegisterFood } from './components/register-food/register-food';
import { StorageList } from './components/storage-list/storage-list';
import { Onboarding } from './components/onboarding/onboarding';

export const routes: Routes = [
{path: '', component: Onboarding},
  {path: 'register-food', component: RegisterFood},
  {path: 'storage-list', component: StorageList},
  {path: 'onboarding', component: Onboarding}
];
