import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcasLiveComponent } from './ccas-live.component';

describe('CcasLiveComponent', () => {
  let component: CcasLiveComponent;
  let fixture: ComponentFixture<CcasLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcasLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcasLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
