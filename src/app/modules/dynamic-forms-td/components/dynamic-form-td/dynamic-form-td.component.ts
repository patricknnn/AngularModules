import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';

export interface ModelFormControl {
  key: string,
  label: string,
  type: string,
}

@Component({
  selector: 'app-dynamic-form-td',
  templateUrl: './dynamic-form-td.component.html',
  styleUrls: ['./dynamic-form-td.component.scss'],
})
export class DynamicFormTdComponent implements OnInit {
  @Input() public formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'fill';
  @Input() public formColor: 'primary' | 'accent' | 'warn' = 'primary';

  @Input() public model!: any;
  @Input() public modelFormControls!: ModelFormControl[];
  @Input() public formValid: boolean = false;

  @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public formValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('modelForm', { static: true }) ngForm!: NgForm;

  constructor() {}

  public ngOnInit(): void {
    this.ngForm.form.valueChanges
      .pipe(
        tap(() => {
          this.formValidChange.emit(this.ngForm.form.valid);
          this.modelChange.emit(this.model);
        })
      )
      .subscribe();
  }

  emitModel(): void {
    this.modelChange.emit(this.model);
  }
}
