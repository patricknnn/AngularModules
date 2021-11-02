import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicFormComponent } from 'src/app/modules/dynamic-forms/components/dynamic-form/dynamic-form.component';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements AfterViewInit, OnDestroy {
  formControls: Observable<DynamicFormControl<any>[]>;
  element: PeriodicElement;
  formControlsSubject: BehaviorSubject<any>;
  boolSubscription?: Subscription;

  @ViewChild('dynamicForm') dynamicForm?: DynamicFormComponent;

  constructor(private formService: FormService) {
    this.element = formService.getElement();
    this.formControlsSubject = new BehaviorSubject(
      formService.getFormControls()
    );
    this.formControls = this.formControlsSubject.asObservable();
  }

  ngAfterViewInit(): void {
    this.subscribeToBool();
  }

  ngOnDestroy(): void {
    this.boolSubscription?.unsubscribe();
  }

  subscribeToBool(): void {
    this.boolSubscription?.unsubscribe();
    this.boolSubscription = this.dynamicForm?.form
      ?.get('bool')
      ?.valueChanges.pipe(
        tap(() => {
          this.updateForm(this.dynamicForm?.form?.get('bool')?.value);
        })
      )
      .subscribe();
  }

  updateForm(extend: boolean): void {
    if (!extend) {
      this.formControlsSubject.next(this.formService.getFormControls());
    } else {
      this.formControlsSubject.next(
        this.formService
          .getFormControls()
          .concat(this.formService.getFormControlsExtra())
      );
    }

    setTimeout(() => {
      this.subscribeToBool();
    });
  }

  logElement(): void {
    console.log(this.dynamicForm?.form?.valid);
    console.log(this.element);
  }
}
