import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { DatePipe } from '@angular/common';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Stock } from '../models/stock.model';

@Component({
  selector: 'app-chart-variance',
  templateUrl: './chart-variance.component.html',
  styleUrls: ['./chart-variance.component.scss'],
})
export class ChartVarianceComponent implements OnInit {
  @Input() data: Stock[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: '' }],
  };

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    const labels: String[] = [];
    const values: number[] = [];
    const percentageChangePreviousDay: number[] = [];
    const percentageChangeFirstDay: number[] = [];

    this.data.map((stock: Stock) => {
      labels.push(this.datePipe.transform(stock.date, 'dd/MM/yyyy') || '');
      values.push(parseFloat(stock.value.toFixed(2)));
      percentageChangePreviousDay.push(
        parseFloat(stock.percentageChangePreviousDay?.toFixed(2) || '0')
      );
      percentageChangeFirstDay.push(
        parseFloat(stock.percentageChangeFirstDay?.toFixed(2) || '0')
      );
    });

    this.barChartData = {
      labels,
      datasets: [
        { data: values, label: 'Valor' },
        {
          data: percentageChangePreviousDay,
          label: 'Variação em relaçào a D-1	',
        },
        {
          data: percentageChangeFirstDay,
          label: 'Variação em relação a primeira data',
        },
      ],
    };
  }
}
