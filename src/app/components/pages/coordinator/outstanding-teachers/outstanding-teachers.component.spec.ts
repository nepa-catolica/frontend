import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingTeachersComponent } from './outstanding-teachers.component';

describe('OutstandingTeachersComponent', () => {
  let component: OutstandingTeachersComponent;
  let fixture: ComponentFixture<OutstandingTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutstandingTeachersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutstandingTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
