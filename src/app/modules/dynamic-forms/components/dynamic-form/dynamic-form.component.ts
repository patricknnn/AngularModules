import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { FormControlService } from '../../services/form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() public formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' =
    'fill';
  @Input() public formColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() public formControls: DynamicFormControl<any>[] = [];
  @Input() public formValid: boolean = false;

  @Output() public formControlsChange: EventEmitter<DynamicFormControl<any>[]> =
    new EventEmitter<DynamicFormControl<any>[]>();
  @Output() public formValidChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public form!: FormGroup;

  public constructor(private readonly formControlService: FormControlService) {}

  public ngOnInit(): void {
    this.form = this.formControlService.toFormGroup(this.formControls);
    this.form.valueChanges
      .pipe(
        tap(() => {
          this.formControls.forEach(
            (formControl: DynamicFormControl<any>) => formControl.value = this.form.controls[formControl.key].value
          );

          this.formValidChange.emit(this.form.valid);
          this.formControlsChange.emit(this.formControls);
        })
      )
      .subscribe();
  }
}
