import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrazingComponent } from './brazing.component';

describe('BrazingComponent', () => {
  let component: BrazingComponent;
  let fixture: ComponentFixture<BrazingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrazingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrazingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
