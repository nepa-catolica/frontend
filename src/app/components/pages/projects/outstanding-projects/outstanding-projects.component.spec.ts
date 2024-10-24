import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingProjectsComponent } from './outstanding-projects.component';

describe('OutstandingProjectsComponent', () => {
  let component: OutstandingProjectsComponent;
  let fixture: ComponentFixture<OutstandingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutstandingProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutstandingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
