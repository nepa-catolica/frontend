import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsByTeachersComponent } from './projects-by-teachers.component';

describe('ProjectsByTeachersComponent', () => {
  let component: ProjectsByTeachersComponent;
  let fixture: ComponentFixture<ProjectsByTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsByTeachersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsByTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
