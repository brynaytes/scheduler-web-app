import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerfordayComponent } from './timepickerforday.component';

describe('TimepickerfordayComponent', () => {
  let component: TimepickerfordayComponent;
  let fixture: ComponentFixture<TimepickerfordayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimepickerfordayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimepickerfordayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
