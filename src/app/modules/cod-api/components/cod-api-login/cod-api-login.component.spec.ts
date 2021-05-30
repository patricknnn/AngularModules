import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodApiLoginComponent } from './cod-api-login.component';

describe('CodApiLoginComponent', () => {
  let component: CodApiLoginComponent;
  let fixture: ComponentFixture<CodApiLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodApiLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodApiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
