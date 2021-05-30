import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodApiDashboardComponent } from './cod-api-dashboard.component';

describe('CodApiDashboardComponent', () => {
  let component: CodApiDashboardComponent;
  let fixture: ComponentFixture<CodApiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodApiDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodApiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
