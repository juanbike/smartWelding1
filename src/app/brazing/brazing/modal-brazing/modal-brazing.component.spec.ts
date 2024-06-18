import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBrazingComponent } from './modal-brazing.component';

describe('ModalBrazingComponent', () => {
  let component: ModalBrazingComponent;
  let fixture: ComponentFixture<ModalBrazingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBrazingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBrazingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
