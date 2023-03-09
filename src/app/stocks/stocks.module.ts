import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ChartVarianceComponent } from './chart-variance/chart-variance.component';
import { StockComponent } from './stock/stock.component';
import { StocksRoutingModule } from './stocks-routing.module';

@NgModule({
  declarations: [StockComponent, ChartVarianceComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    StocksRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
})
export class StocksModule {}
