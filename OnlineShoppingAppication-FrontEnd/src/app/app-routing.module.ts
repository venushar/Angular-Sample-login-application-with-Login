import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './User/user.component';

const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
