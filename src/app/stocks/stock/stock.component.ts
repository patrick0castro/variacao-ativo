import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { addDays, fromUnixTime } from 'date-fns';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { PeriodDate } from '../models/period-date.model';
import { StockGroup } from '../models/stock-group.model';
import { Stock } from '../models/stock.model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  public loading = false;
  public stockSelected = '';
  public periodDate: PeriodDate;
  public stockGroupOptions$: Observable<StockGroup[]>;
  public stockOptions: StockGroup[] = [];

  public stock: Stock[] = [];
  public formGroup = this.formBuilder.group({
    stockControl: '',
  });

  public displayedColumns = [
    'numberDay',
    'date',
    'value',
    'percentageChangePreviousDay',
    'percentageChangeFirstDay',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService,
    private formBuilder: FormBuilder
  ) {
    const date = new Date();

    this.periodDate = {
      start: addDays(date, -31),
      end: addDays(date, -1),
    };

    this.stockService
      .getStockOption()
      .subscribe((data) => (this.stockOptions = data));

    this.stockGroupOptions$ = this.formGroup
      .get('stockControl')!
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        map((value) => this._filter(value || ''))
      );

    this.route.params.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.formGroup.get('stockControl')?.setValue(code);
      } else {
        this.formGroup.get('stockControl')?.setValue('PETR4');
      }
      this.onSubmit();
    });
  }

  onSubmit() {
    const teste = this.formGroup.get('stockControl')!.value;
    this.router.navigate(['/' + teste], { replaceUrl: true });

    this.getStock(this.formGroup.get('stockControl')!.value || '');
  }

  private getStock(value: string) {
    this.stockSelected = value;
    this.loading = true;
    this.stock = [];

    this.stockService
      .getStockByPeriod(value, this.periodDate.start, this.periodDate.end)
      .subscribe({
        next: (data) => {
          this.stock = this.serializer(
            data.indicators.quote[0].open,
            data.timestamp
          );
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
  private _filter(value: string): StockGroup[] {
    const filterValue = value.toLowerCase();

    return this.stockOptions.filter(
      (option) =>
        option.symbol.toLowerCase().includes(filterValue) ||
        option.name.toLowerCase().includes(filterValue)
    );
  }

  private serializer(values: number[], timestamp: number[]): Stock[] {
    const data = values.map((value, index) => {
      const stock: Stock = {
        numberDay: index + 1,
        value: value,
        date: fromUnixTime(timestamp[index]),
      };

      if (index) {
        stock.percentageChangePreviousDay = this.percentageChange(
          values[index - 1],
          values[index]
        );

        stock.percentageChangeFirstDay = this.percentageChange(
          values[0],
          values[index]
        );
      }

      return stock;
    });

    return data;
  }

  private percentageChange(
    valuePrevious: number,
    valuePosterior: number
  ): number {
    return ((valuePrevious - valuePosterior) / valuePosterior) * -1;
  }

  clearSearch() {
    this.formGroup.get('stockControl')?.patchValue('');
  }
}
