import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelderEditComponent } from './welder-edit.component';

describe('WelderEditComponent', () => {
  let component: WelderEditComponent;
  let fixture: ComponentFixture<WelderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelderEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
