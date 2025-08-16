import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressorsComponent } from './compressors.component';

describe('CompressorsComponent', () => {
  let component: CompressorsComponent;
  let fixture: ComponentFixture<CompressorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompressorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompressorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
