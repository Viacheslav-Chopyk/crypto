import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalPriceChartComponent } from './historical-price-chart.component';

describe('HistoricalPriceChartComponent', () => {
  let component: HistoricalPriceChartComponent;
  let fixture: ComponentFixture<HistoricalPriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalPriceChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricalPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
