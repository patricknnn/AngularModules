import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formControls$: Observable<FormControlBase<any>[]>;

  constructor(formService: FormService) {
    this.formControls$ = formService.getFormControls();
  }

  ngOnInit(): void {
  }
}
