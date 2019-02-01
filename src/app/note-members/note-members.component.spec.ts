import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMembersComponent } from './note-members.component';

describe('NoteMembersComponent', () => {
  let component: NoteMembersComponent;
  let fixture: ComponentFixture<NoteMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
