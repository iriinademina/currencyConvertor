import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertorFormComponent } from './convertor-form.component';

describe('ConvertorFormComponent', () => {
  let component: ConvertorFormComponent;
  let fixture: ComponentFixture<ConvertorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
