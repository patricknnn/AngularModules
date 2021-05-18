import { Component, Input } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { FormControlBase } from "../../models/form-control-base";

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent {
  @Input() control!: FormControlBase<any>;
  @Input() form!: FormGroup;
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  get isFormFieldControl(): boolean {
    const formFieldControls = ["text", "textarea", "dropdown", "date", "date-range", "chips"];
    return formFieldControls.includes(this.control.controlType);
  }

  get isRequired(): boolean {
    return this.control.validators.includes(Validators.required);
  }

  get isValid(): boolean {
    return this.form.controls[this.control.key].valid;
  }

  get isTouched(): boolean {
    return this.form.controls[this.control.key].touched;
  }

  get errorMessage(): string {
    let message = this.control.label;
    message += this.form.controls[this.control.key].hasError("min") ? " must be higher" : "";
    message += this.form.controls[this.control.key].hasError("max") ? " must be lower" : "";
    message += this.form.controls[this.control.key].hasError("required") ? " is required" : "";
    message += this.form.controls[this.control.key].hasError("requiredTrue") ? " is required" : "";
    message += this.form.controls[this.control.key].hasError("email") ? " must be email" : "";
    message += this.form.controls[this.control.key].hasError("minLength") ? " must be longer" : "";
    message += this.form.controls[this.control.key].hasError("maxLength") ? " must be shorter" : "";
    message += this.form.controls[this.control.key].hasError("pattern") ? " must match pattern" : "";
    return message;
  }

  updateFormFieldState(): void {
    this.form.controls[this.control.key].markAsTouched();
    let formControl = document.getElementById("form-field-" + this.control.key);
    this.isValid ? formControl?.classList.remove("mat-form-field-invalid") : formControl?.classList.add("mat-form-field-invalid");
  }

  setDateRange(): void {
    this.form.controls[this.control.key].setValue(this.dateRange.value);
  }

  addToValue(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let controlValue = this.form.controls[this.control.key].value;
    if (value && controlValue instanceof Array) {
      controlValue.push(value);
      this.form.controls[this.control.key].setValue(controlValue);
    }
    event.chipInput!.clear();
  }

  removeFromValue(item: string): void {
    let controlValue = this.form.controls[this.control.key].value;
    const index = controlValue.indexOf(item);
    if (index >= 0) {
      controlValue.splice(index, 1);
      this.form.controls[this.control.key].setValue(controlValue);
    }
  }


}
