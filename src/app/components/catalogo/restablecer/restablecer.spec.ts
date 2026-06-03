import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerComponent } from './restablecer';

describe('Recuperar', () => {
  let component: RestablecerComponent;
  let fixture: ComponentFixture<RestablecerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestablecerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestablecerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
