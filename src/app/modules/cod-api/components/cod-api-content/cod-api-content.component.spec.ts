import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodApiContentComponent } from './cod-api-content.component';

describe('CodApiContentComponent', () => {
  let component: CodApiContentComponent;
  let fixture: ComponentFixture<CodApiContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodApiContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodApiContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
