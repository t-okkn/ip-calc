import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitBtnComponent } from './init-btn.component';

describe('InitBtnComponent', () => {
  let component: InitBtnComponent;
  let fixture: ComponentFixture<InitBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
