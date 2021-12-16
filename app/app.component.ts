import { Component, NgModule } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  single: any[];
  filteredSingle: any[];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  disableAdd: boolean = false;
  disableRemove: boolean = false;

  labels = ['Assicurativo', 'Bilanciato', 'Spesato'];

  constructor() {}

  ngOnInit() {
    Object.assign(this, { single });
    //Original data into filteredSingle
    this.filteredSingle = JSON.parse(JSON.stringify(this.single));
    if (this.sumValues(this.filteredSingle) >= 100) {
      this.disableAdd = true;
    } else {
      const difference = 100 - this.sumValues(this.single);
      this.single = [...this.single, { name: 'pivot', value: difference }];
    }
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  sumValues(data: any) {
    let sum = 0;
    for (let val in data) {
      sum = sum + data[val].value;
    }
    return sum;
  }

  indexOfName(data: any, name: string) {
    return data.findIndex((el) => el.name === name);
  }

  addValues(name: string) {
    if (this.sumValues(this.filteredSingle) >= 100) {
      this.disableAdd = true;
    } else {
      const idx = this.indexOfName(this.single, name);
      this.single[idx].value = this.single[idx].value + 25;
      const idxPivot = this.indexOfName(this.single, 'pivot');
      if (idxPivot >= 0) {
        this.single[idxPivot].value = this.single[idxPivot].value - 25;
      }
      this.single = [...this.single];
      this.disableAdd = this.sumValues(this.filteredSingle) >= 100;
    }
    console.log('addValues: ', this.single);
  }

  subtractionValues(name: string) {
    if (this.sumValues(this.single) <= 100) {
      const idx = this.indexOfName(this.single, name);
      this.single[idx].value = this.single[idx].value - 25;
      const idxPivot = this.indexOfName(this.single, 'pivot');
      if (idxPivot >= 0) {
        this.single[idxPivot].value = this.single[idxPivot].value + 25;
      }
      this.single = [...this.single];
      this.disableAdd = this.sumValues(this.single) >= 100;
    } else {
      this.disableAdd = true;
    }
    console.log('subtractionValues: ', this.single);
  }
}
