import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelderAddComponent } from './welder-add.component';

describe('WelderAddComponent', () => {
  let component: WelderAddComponent;
  let fixture: ComponentFixture<WelderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelderAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
