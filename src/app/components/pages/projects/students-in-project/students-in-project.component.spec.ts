import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsInProjectComponent } from './students-in-project.component';

describe('StudentsInProjectComponent', () => {
  let component: StudentsInProjectComponent;
  let fixture: ComponentFixture<StudentsInProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsInProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsInProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
