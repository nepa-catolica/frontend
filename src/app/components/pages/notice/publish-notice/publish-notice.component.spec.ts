import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishNoticeComponent } from './publish-notice.component';

describe('PublishNoticeComponent', () => {
  let component: PublishNoticeComponent;
  let fixture: ComponentFixture<PublishNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishNoticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
