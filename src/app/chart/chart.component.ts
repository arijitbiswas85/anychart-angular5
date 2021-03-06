import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { DemoDataProviderService } from '../demo-data-provider.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  constructor(private dataService_: DemoDataProviderService) {
    this.subscription = this.dataService_.dataSetChanged$.subscribe(
      dataSet => this.chart.data(this.dataService_.getData(dataSet))
    );
  }

  @ViewChild('chartContainer') container;

  chart: anychart.charts.Pie = null;

  ngOnInit() {
    // Default data set mapping, hardcoded here.
    this.chart = anychart.pie(this.dataService_.getData('data1'));
  }

  ngAfterViewInit() {
    this.chart.container(this.container.nativeElement);
    this.chart.draw();
  }

}
