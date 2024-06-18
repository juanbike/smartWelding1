import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBrazingComponent } from './edit-brazing.component';

describe('EditBrazingComponent', () => {
  let component: EditBrazingComponent;
  let fixture: ComponentFixture<EditBrazingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBrazingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBrazingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
