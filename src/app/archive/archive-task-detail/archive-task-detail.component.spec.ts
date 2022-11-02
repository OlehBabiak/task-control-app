import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTaskDetailComponent } from './archive-task-detail.component';

describe('ArchiveTaskDetailComponent', () => {
  let component: ArchiveTaskDetailComponent;
  let fixture: ComponentFixture<ArchiveTaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveTaskDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
