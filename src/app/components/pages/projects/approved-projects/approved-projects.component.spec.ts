import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedProjectsComponent } from './approved-projects.component';

describe('ApprovedProjectsComponent', () => {
  let component: ApprovedProjectsComponent;
  let fixture: ComponentFixture<ApprovedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
