import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CodApiService } from '../../services/cod-api/cod-api.service';

@Component({
  selector: 'app-cod-api-login',
  templateUrl: './cod-api-login.component.html',
  styleUrls: ['./cod-api-login.component.scss']
})
export class CodApiLoginComponent implements OnInit {
  username = new FormControl('', [ Validators.required ]);
  password = new FormControl('', [ Validators.required ]);

  constructor(private api: CodApiService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.api.login(this.username.value, this.password.value);
  }

}
