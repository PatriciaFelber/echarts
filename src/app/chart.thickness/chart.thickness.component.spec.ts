import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartThicknessComponent } from './chart.thickness.component';

describe('ChartThicknessComponent', () => {
  let component: ChartThicknessComponent;
  let fixture: ComponentFixture<ChartThicknessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartThicknessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartThicknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
