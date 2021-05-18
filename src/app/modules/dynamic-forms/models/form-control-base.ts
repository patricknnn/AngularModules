import { ValidatorFn } from "@angular/forms";

export class FormControlBase<T> {
  value: T | undefined;
  key: string;
  type: string;
  controlType: string;
  order: number;
  placeholder: string;
  label: string;
  labelPosition: "before" | "after";
  floatLabel: "auto" | "always" | "never";
  appearance: "legacy" | "standard" | "fill" | "outline";
  color: "primary" | "accent" | "warn";
  class: string;
  indeterminate: boolean;
  selectable: boolean;
  removable: boolean;
  addOnBlur: boolean;
  options: { key: string, value: string }[];
  validators: ValidatorFn[];

  constructor(options: {
    value?: T | undefined,
    key?: string,
    type?: string,
    controlType?: string,
    order?: number,
    placeholder?: string,
    label?: string,
    labelPosition?: "before" | "after",
    floatLabel?: "auto" | "always" | "never",
    appearance?: "legacy" | "standard" | "fill" | "outline",
    color?: "primary" | "accent" | "warn",
    class?: string,
    indeterminate?: boolean
    selectable?: boolean,
    removable?: boolean,
    addOnBlur?: boolean,
    options?: { key: string, value: string }[],
    validators?: ValidatorFn[]
  }) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.labelPosition = options.labelPosition || "before";
    this.floatLabel = options.floatLabel || "auto";
    this.placeholder = options.placeholder || "";
    this.appearance = options.appearance || "standard";
    this.color = options.color || "primary";
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
    this.type = options.type || "";
    this.indeterminate = options.indeterminate || false;
    this.selectable = options.selectable || false;
    this.removable = options.removable || true;
    this.addOnBlur = options.addOnBlur || true;
    this.class = options.class || "";
    this.options = options.options || [];
    this.validators = options.validators || [];
  }
}