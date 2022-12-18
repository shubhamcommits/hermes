import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCheckHeaderComponent } from './health-check-header.component';

describe('HealthCheckHeaderComponent', () => {
  let component: HealthCheckHeaderComponent;
  let fixture: ComponentFixture<HealthCheckHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthCheckHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthCheckHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
