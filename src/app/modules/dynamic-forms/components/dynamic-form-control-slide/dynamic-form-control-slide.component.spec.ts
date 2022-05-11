import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlSlideComponent } from './dynamic-form-control-slide.component';

describe('DynamicFormControlSlideComponent', () => {
  let component: DynamicFormControlSlideComponent;
  let fixture: ComponentFixture<DynamicFormControlSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
