import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicFormComponent } from 'src/app/modules/dynamic-forms/components/dynamic-form/dynamic-form.component';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';
import { DynamicFormControlAutocompleteOption } from 'src/app/modules/dynamic-forms/models/dynamic-form-control-autocomplete-option';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formControls?: DynamicFormControl<any>[];
  element: PeriodicElement;

  @ViewChild('dynamicForm') dynamicForm?: DynamicFormComponent;

  constructor(private formService: FormService, private http: HttpClient) {
    this.element = formService.getElement();

    const options: DynamicFormControlAutocompleteOption[] = [];
    this.http
      .get('https://flagcdn.com/en/codes.json')
      .toPromise()
      .then((result: any) => {
        Object.keys(result).forEach((countryCode: string) => {
          let imageSize: string = 'h20';
          let option: DynamicFormControlAutocompleteOption = {
            value: result[countryCode],
            image: `https://flagcdn.com/${imageSize}/${countryCode}.png`,
          };
          options.push(option);
        });
        this.formControls = this.formService.getFormControls(options);
      });
  }

  logElement(): void {
    console.log(this.dynamicForm?.form?.valid);
    console.log(this.element);
  }
}
