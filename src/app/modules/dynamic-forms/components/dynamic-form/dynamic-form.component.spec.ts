import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlService } from '../../services/form-control.service';
import { DynamicFormComponent } from './dynamic-form.component';


describe('DynamicFormComponent', () => {
  let formControlServiceStub: Partial<FormControlService>;
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(() => {
    formControlServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      providers: [
        { provide: FormControlService, useValue: formControlServiceStub },
      ],
    });

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    TestBed.inject(FormControlService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
