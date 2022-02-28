import { Component, OnInit, ViewChild, Input } from '@angular/core';//Manual merge
import { Subscription } from 'rxjs';//Manual merge
import { ChartComponent } from "ng-apexcharts";
import { TcmService } from '../services/tcm-service';//Manual merge

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
  @Input() tcmId: string;//Manual merge
  @Input() isRedis: string;//Manual merge
  
  @ViewChild("chart") chart: ChartComponent;
    public prodChartOptions: Partial<ChartOptions>;
    public qaChartOptions: Partial<ChartOptions>;
    public netNewChartOptions: Partial<ChartOptions>;
    public prodErrCount = '10';
    public qaErrCount = '15';

    sub!: Subscription;//Manual merge
    errorMessage:string;//Manual merge

//   constructor() { }
constructor(private tcmService: TcmService) {//Manual merge
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
    this.setParams();//Manual merge
    this.getErrorSummary(false);// Pass false to call service, true to mock  //Manual merge
  }

  setParams() {//Manual merge - entire method
    // If query params not available, use hard-coded values
    if (!this.tcmId) {
        this.tcmId = '123456789'
    }
    if (!this.isRedis) {
        this.isRedis = 'false'
    }
  }

  getErrorSummary(isMock?: boolean) {//Manual merge - entire method
    if (isMock) {
      this.sub = this.tcmService.getTcmErrorSummaryMock(this.tcmId, 'ALL').subscribe({
        next: errorSummary => {
          console.log('getErrorSummary', errorSummary);
        },
        error: err => this.errorMessage = err
      });
    } else {
      this.sub = this.tcmService.getTcmErrorSummary(this.tcmId, 'ALL', this.isRedis).subscribe({
        next: errorSummary => {
          console.log('getErrorSummary', errorSummary);
         },
        error: err => this.errorMessage = err
      });
    }
  }

}
