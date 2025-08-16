import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EStatusComponent } from './e-status.component';

describe('EStatusComponent', () => {
  let component: EStatusComponent;
  let fixture: ComponentFixture<EStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
