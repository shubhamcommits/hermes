import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLineGraphComponent } from './custom-line-graph.component';

describe('CustomLineGraphComponent', () => {
  let component: CustomLineGraphComponent;
  let fixture: ComponentFixture<CustomLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLineGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
