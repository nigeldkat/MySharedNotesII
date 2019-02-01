

import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

import { NoteComponent } from './note/note.component';
import { NotelistComponent } from './notelist/notelist.component';
import { NoteMembersComponent } from './note-members/note-members.component';

import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'notelist', pathMatch: 'full'}, 
    { path: 'welcome', component: WelcomeComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: 'note/:id/:desc', component: NoteComponent},
    { path: 'notelist', component: NotelistComponent, canActivate:[AuthGuard]}, 
    { path: 'notemembers/:id', component: NoteMembersComponent},   
    //{ path: '**', component: PageNotFoundComponent}  
    //page not found overrode by code in auth service isauth listner
    //or just not working in this config
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}