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
    domain: ['#5AA454', '#A10A28', '#C7B42C'],
  };

  disableAllAdd: boolean = false;
  disableRemove: boolean = false;

  constructor() {}

  ngOnInit() {
    Object.assign(this, { single });
    //Original data into filteredSingle
    this.filteredSingle = JSON.parse(JSON.stringify(this.single));
    if (this.sumValues(this.filteredSingle) >= 100) {
      this.disableAllAdd = true;
    } else {
      const difference = 100 - this.sumValues(this.single);
      this.single = [...this.single, { name: 'pivot', value: difference }];
      this.colorScheme.domain.push('#AAAAAA');
    }
  }

  private sumValues(data: any) {
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
      this.disableAllAdd = true;
    } else {
      const idx = this.indexOfName(this.single, name);
      this.single[idx].value = this.single[idx].value + 25;
      const idxPivot = this.indexOfName(this.single, 'pivot');
      if (idxPivot >= 0 && this.single[idxPivot].value >= 0) {
        this.single[idxPivot].value = this.single[idxPivot].value - 25;
      } else {
        const difference = 100 - this.sumValues(this.single);
        this.single = [...this.single, { name: 'pivot', value: difference }];
      }
      const deletedPivot = this.single.filter((el) => el.name !== 'pivot');
      this.filteredSingle = JSON.parse(JSON.stringify(deletedPivot));
      this.single = [...this.single];
      this.disableAllAdd = this.sumValues(this.filteredSingle) >= 100;
    }
  }

  removeValues(name: string) {
    if (this.sumValues(this.filteredSingle) <= 100) {
      const idx = this.indexOfName(this.single, name);
      this.single[idx].value = this.single[idx].value - 25;
      const idxPivot = this.indexOfName(this.single, 'pivot');
      if (idxPivot >= 0 && this.single[idxPivot].value <= 100) {
        this.single[idxPivot].value = this.single[idxPivot].value + 25;
      } else {
        const difference = 100 - this.sumValues(this.single);
        this.single = [...this.single, { name: 'pivot', value: difference }];
      }
      const deletedPivot = this.single.filter((el) => el.name !== 'pivot');
      this.filteredSingle = JSON.parse(JSON.stringify(deletedPivot));
      this.single = [...this.single];
      this.disableAllAdd = this.sumValues(this.filteredSingle) >= 100;
    } else {
      this.disableAllAdd = true;
    }
  }
}
