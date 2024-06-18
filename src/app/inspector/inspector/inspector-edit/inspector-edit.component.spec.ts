import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorEditComponent } from './inspector-edit.component';

describe('InspectorEditComponent', () => {
  let component: InspectorEditComponent;
  let fixture: ComponentFixture<InspectorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectorEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InspectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
