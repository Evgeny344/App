import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionUserComponent } from './addition-user.component';

describe('AdditionUserComponent', () => {
  let component: AdditionUserComponent;
  let fixture: ComponentFixture<AdditionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
