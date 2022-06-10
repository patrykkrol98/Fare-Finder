import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaresListComponent } from './fares-list.component';

describe('FaresListComponent', () => {
  let component: FaresListComponent;
  let fixture: ComponentFixture<FaresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
