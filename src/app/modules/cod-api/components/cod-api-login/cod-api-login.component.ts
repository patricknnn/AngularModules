import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CodApiService } from '../../services/cod-api/cod-api.service';

@Component({
  selector: 'app-cod-api-login',
  templateUrl: './cod-api-login.component.html',
  styleUrls: ['./cod-api-login.component.scss']
})
export class CodApiLoginComponent implements OnInit {
  // ka4scod@gmail.com KAASCOD#8395529 Kakbaard1
  username = new FormControl('ka4scod@gmail.com', [ Validators.required ]);
  password = new FormControl('Kakbaard1', [ Validators.required ]);

  constructor(private api: CodApiService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.api.login(this.username.value, this.password.value);
  }

}
