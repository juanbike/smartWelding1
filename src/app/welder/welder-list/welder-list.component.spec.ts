import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelderListComponent } from './welder-list.component';

describe('WelderListComponent', () => {
  let component: WelderListComponent;
  let fixture: ComponentFixture<WelderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
