import { Component, OnInit, Input} from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { DetailByEnv, ErrorDetails, ErrorView, ErrorRow} from '../models/ErrorSummary';
import { Subscription } from 'rxjs';
import { TcmService } from '../services/tcm-service';
import { ErrorSummary } from "../models/ErrorSummary";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import * as ApexCharts from 'apexcharts';
// import { countReset } from 'console';
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
    //@Input() tcmId: string;//Manual merge				//
  //@Input() isRedis: string;//Manual merge				//
  
    tcmId: string;							  //
    isRedis: string;							//
    public resourceChartOptions: Partial<ChartOptions>[][] = [];
    public apps:Array<string> = ['ALL','bwflegacysvc','clientauth']; 
    public selectedAppOption:string;
    public nonProdEnvs:Array<string> = ['QA','QA1']; 
    public selectedNonProdEnvOption:string;
    private sub!: Subscription;
    private errorMessage:string;   
    private errorList: ErrorView[] = [];
    public resoureErrorSummary:ErrorSummary[];

    constructor(private tcmService: TcmService) {}
   

  ngOnInit(): void {
    this.getContext();
    this.selectedAppOption = 'ALL';
    this.selectedNonProdEnvOption = 'QA';
    this.setParams();//Manual merge
    this.getErrorSummary(false);// Pass false to call service, true to mock  //Manual merge
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
      this.sub = this.tcmService.getTcmErrorSummary(this.tcmId, this.selectedAppOption, this.isRedis).subscribe({
        next: errorSummary => {
          this.resoureErrorSummary = errorSummary;
          console.log('ErrorSummaryResponse: ', JSON.stringify(this.resoureErrorSummary));
          this.buildCharts();
         },
        error: err => this.errorMessage = err
      });
    }
  }



  buildCharts(){

      this.resoureErrorSummary.forEach(
        resourceError => {

          let resourceChartOptionsRow: Partial<ChartOptions>[] = [];
          
          let pseries: any = [];
          let plabels: any = [];
          console.log("1 :: ", resourceError.summaryViewStats[0].error);
          for (const error of resourceError.summaryViewStats[0].error){
            console.log("error :: ", error);
            console.log("errorCount :: ", error.errorCount);
            console.log("errorType :: ", error.errorType);
            pseries.push(error.errorCount);
            plabels.push(error.errorType);
          }
          console.log(pseries);
          console.log(plabels);

          let prodChartOptions: Partial<ChartOptions> = {
            series : pseries,
            chart: {
              width: 350,
              type: "pie"
            },
            labels: plabels,
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

          let qseries: any = [];
          let qlabels: any = [];
          for (const error of resourceError.summaryViewStats[1].error){
          qseries.push(error.errorCount);
          qlabels.push(error.errorType);
          }
          
          let qaChartOptions: Partial<ChartOptions> = {
              series: qseries,
              chart: {
                  width: 350,
                  type: "pie"
              },
              labels: qlabels,
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

          let nseries: any = [];
          let nlabels: any = [];
          for (const error of resourceError.summaryViewStats[2].error){
            nseries.push(error.errorCount);
            nlabels.push(error.errorType);
          }

          let netNewChartOptions: Partial<ChartOptions> = {
              series: nseries,
              chart: {
                  width: 350,
                  type: "pie"
              },
              labels: nlabels,
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
          
          resourceChartOptionsRow.push(prodChartOptions, qaChartOptions, netNewChartOptions);
          console.log("resource options row arrays : ", JSON.stringify(resourceChartOptionsRow))

          this.resourceChartOptions.push(resourceChartOptionsRow);
          console.log("resource options full arrays : ", JSON.stringify(this.resourceChartOptions))

      }  
    );
   
  }


  public selectAppChange(){
    console.log("app changed : " + this.selectedAppOption)
  }

  public selectNonProdEnvChange() {
    console.log("non prod env changed : " + this.selectedNonProdEnvOption)
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

  getContext() {											//
    this.tcmId = this.getQueryStringValues('tcm');
    this.isRedis = this.getQueryStringValues('redis');
    console.log("tcmId::",this.tcmId);
  }

  getQueryStringValues(key: string): string {								//
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; vars && i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == key) {
        console.log('Query variable found for ' + key + ': ', decodeURIComponent(pair[1]));
        return decodeURIComponent(pair[1]);
      }
    }
    console.log('Query variable not found', key);
    return '';
  }

}
