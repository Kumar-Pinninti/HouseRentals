import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminProfileComponent } from './update-admin-profile.component';

describe('UpdateAdminProfileComponent', () => {
  let component: UpdateAdminProfileComponent;
  let fixture: ComponentFixture<UpdateAdminProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdminProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
