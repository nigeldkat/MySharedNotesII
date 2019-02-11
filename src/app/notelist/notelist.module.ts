import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NotelistComponent } from './notelist.component';
import { NoteListRoutingModule } from './notelist-routing.module';

import {NoteListService} from './notelist.service';

@NgModule({
    declarations: [ NotelistComponent],
    imports: [
        SharedModule,
        NoteListRoutingModule
    ],
    providers:[NoteListService],
    exports: [],
    entryComponents: []
})
export class NoteListModule { }