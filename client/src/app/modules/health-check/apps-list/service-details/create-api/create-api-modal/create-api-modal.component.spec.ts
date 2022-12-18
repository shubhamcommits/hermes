import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApiModalComponent } from './create-api-modal.component';

describe('CreateApiModalComponent', () => {
  let component: CreateApiModalComponent;
  let fixture: ComponentFixture<CreateApiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateApiModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateApiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
