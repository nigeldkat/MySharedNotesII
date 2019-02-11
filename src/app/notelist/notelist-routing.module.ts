import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotelistComponent } from './notelist.component';

const routes: Routes = [
    { path: '', component: NotelistComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoteListRoutingModule {

}