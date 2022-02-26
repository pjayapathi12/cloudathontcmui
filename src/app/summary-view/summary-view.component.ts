import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
  };

@Component({
  selector: 'summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css']
})
export class SummaryViewComponent implements OnInit {
    @ViewChild("chart") chart: ChartComponent;
    public prodChartOptions: Partial<ChartOptions>;
    public qaChartOptions: Partial<ChartOptions>;
    public netNewChartOptions: Partial<ChartOptions>;
    public prodErrCount = '10';
    public qaErrCount = '15';

//   constructor() { }
constructor() {
    this.prodChartOptions = {
      series: [4, 1, 2, 5],
      chart: {
        width: 350,
        type: "pie"
      },
      labels: ["500", "400", "404", "general"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.qaChartOptions = {
        series: [1, 2, 3, 3],
        chart: {
            width: 350,
            type: "pie"
        },
        labels: ["500", "400", "404", "general"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }
        ]
    };
    this.netNewChartOptions = {
        series: [1, 2, 3, 5],
        chart: {
            width: 350,
            type: "pie"
        },
        labels: ["500", "400", "404", "general"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }
        ]
    };
  }

  ngOnInit(): void {

  }

}
