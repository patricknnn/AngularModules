import { Injectable } from '@angular/core';
import { COUNTRIES_EN } from '../constants/countries_en';
import { Country } from '../models/country';

import { DynamicFormControlAutocompleteOption } from '../models/dynamic-form-control-autocomplete-option';

@Injectable()
export class FormControlAutocompleteService {
  public getCountryAutocompleteOptions(): DynamicFormControlAutocompleteOption[] {
    return COUNTRIES_EN.map((country: Country) => {
      return {
        value: country.alpha2Code,
        label: country.name,
        image: `https://flagcdn.com/w40/${country.alpha2Code.toLowerCase()}.png`,
      };
    });
  }
}
