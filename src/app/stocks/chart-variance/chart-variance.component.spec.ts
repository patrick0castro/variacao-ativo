import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVarianceComponent } from './chart-variance.component';

describe('ChartVarianceComponent', () => {
  let component: ChartVarianceComponent;
  let fixture: ComponentFixture<ChartVarianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartVarianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartVarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
