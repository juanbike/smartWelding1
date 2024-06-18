import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorAddComponent } from './inspector-add.component';

describe('InspectorAddComponent', () => {
  let component: InspectorAddComponent;
  let fixture: ComponentFixture<InspectorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectorAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InspectorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
