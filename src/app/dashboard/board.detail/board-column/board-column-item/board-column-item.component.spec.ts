import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardColumnItemComponent } from './board-column-item.component';

describe('BoardColumnItemComponent', () => {
  let component: BoardColumnItemComponent;
  let fixture: ComponentFixture<BoardColumnItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardColumnItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardColumnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
