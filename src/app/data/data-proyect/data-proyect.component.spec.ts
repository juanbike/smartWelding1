import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProyectComponent } from './data-proyect.component';

describe('DataProyectComponent', () => {
  let component: DataProyectComponent;
  let fixture: ComponentFixture<DataProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataProyectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
