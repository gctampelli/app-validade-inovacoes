import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFood } from './register-food';

describe('ClientUserInfo', () => {
  let component: RegisterFood;
  let fixture: ComponentFixture<RegisterFood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
