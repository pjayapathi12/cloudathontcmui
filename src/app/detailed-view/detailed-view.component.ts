import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DetailByEnv, ErrorDetails, ErrorView, ErrorRow } from '../models/ErrorSummary';

import { TcmService } from '../services/tcm-service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {
  @Input() tcmId: string;
  @Input() resourceName: string;
  @Input() isRedis: string;

  errorDetails: ErrorDetails[];
  errors500: ErrorDetails[] = [];
  errors400: ErrorDetails[] = [];
  errors404: ErrorDetails[] = [];
  errorsGeneral: ErrorDetails[] = [];

  sub!: Subscription;
  errorMessage:string;
  
  errorList: ErrorView[] = [];

  nonProdEnv = 'qa';
  prodEnv = 'prod';
  ERROR_TYPES: string[] = ['500','400','404','Other'];

  errorRows: ErrorRow[] = [];
  errorList500: ErrorRow[] = [];
  errorList400: ErrorRow[] = [];
  errorList404: ErrorRow[] = [];
  errorListOther: ErrorRow[] = [];

  //   For Angular material  
  dataSource: any;// = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns = ['errorName', 'errorType'];

  constructor(private tcmService: TcmService) {
    
  }

  ngOnInit(): void {
    this.setParams();
    this.getErrorDetails(true);
  }

  setParams() {
    // If query params not available, use hard-coded values
    if (!this.tcmId) {
        this.tcmId = '123456789'
    }
    if (!this.resourceName) {
        this.resourceName = 'tcmeventsvc';
    }
    if (!this.isRedis) {
        this.isRedis = 'false'
    }
  }

  getErrorDetails(isMock: boolean) {
    if (isMock) {
        this.sub = this.tcmService.getResourceErrorDetailsMock(this.tcmId, this.resourceName).subscribe({
            next: errorDetails => {
                console.log('errorDetails from mock', errorDetails);
                this.errorDetails = errorDetails;
                if (this.errorDetails) {
                    this.groupErrorsByType();
                    this.mapErrors();
                }
             },
            error: err => this.errorMessage = err
          });
    } else {
        this.sub = this.tcmService.getResourceErrorDetails(this.tcmId, this.resourceName, this.isRedis).subscribe({
            next: errorDetails => {
                console.log('errorDetails from service', errorDetails);
                this.errorDetails = errorDetails;
                errorDetails.forEach(error => {
                    let jsonData = this.parseData(error.data);
                    error.data = jsonData;
                })
                // console.log('errorDetails', errorDetails)
                this.groupErrorsByType();
                this.mapErrors();
                // this.splitErrorsByEnv();
            },
            error: err => this.errorMessage = err
        });
    }
  }

  parseData(dataString): any {
    return JSON.parse(dataString);
  }

  groupErrorsByType() {
    console.log('groupErrorsByType', this.errorDetails);
    this.errorDetails.forEach(error => 
        {
            switch (error.errorType) {
                case '500':
                    this.errors500.push(error);
                    break;
                case '400':
                    this.errors400.push(error);
                    break;
                case '404':
                    this.errors404.push(error);
                    break;
                default:
                    this.errorsGeneral.push(error);
                    break;
            }
        }
    );
    // For Angular Material
    // this.dataSource = new MatTableDataSource(this.errorDetails);
    // console.log('dataSource', this.dataSource);
  }

  getCount(data: DetailByEnv[], env: string): number {
    let match = data.find(ele => ele.env == env);
    return match ? match.total : 0;
  }

  isNetNew(data: DetailByEnv[]): boolean {
    console.log('isNetNew called', data);
    if (data) {
        let prod = data.find(ele => ele.env == this.prodEnv);
        let nonprod = data.find(ele => ele.env == this.nonProdEnv);
        return nonprod.total > 0 && prod.total <= 0;
    }
    return false;
  }

    mapErrors() {
        console.log('mapErrors - errorDetails', this.errorDetails);
        this.setErrorRows();
        console.log('mapErrors - errorRows', this.errorRows);
        if (this.errorRows) {
            this.setErrorLists(this.errorRows);
        }
    }

    setErrorRows() {
        console.log('setErrorRows', this.errorDetails);
        this.errorDetails.forEach(error => {
            let prodCount = this.getCount(error.data, this.prodEnv);
            let nonProdCount = this.getCount(error.data, this.nonProdEnv);
            let ele: ErrorRow = {
                errorType: error.errorType,
                errorName: error.errorName,
                jira: error.jira,
                jiraStatus: error.jiraStatus,
                prodCount: prodCount,
                nonProdCount: nonProdCount,
                totalCount: prodCount + nonProdCount,
                isNetNew: this.isNetNew(error.data)
            };
            this.errorRows.push(ele);
        });
        console.log('errorRows:', this.errorRows);
    }

    setErrorLists(errorList: ErrorRow[]) {
        console.log('setErrorLists', this.errorDetails);
        errorList.forEach(error => 
            {
                switch (error.errorType) {
                    case '500':
                        this.errorList500.push(error);
                        break;
                    case '400':
                        this.errorList400.push(error);
                        break;
                    case '404':
                        this.errorList404.push(error);
                        break;
                    default:
                        this.errorListOther.push(error);
                        break;
                }
            }
        );
    }

    // Not used
//   splitErrorsByEnv() {  
//     this.errors500.forEach(error => {
//         error.data.forEach(envData => {
//             let ele = {
//                 env: envData.env,
//                 errorType: error.errorType,
//                 errorName: error.errorName,
//                 jira: error.jira,
//                 jiraStatus: error.jiraStatus,
//                 count: envData.total,
//                 isNetNew: false // TO DO
//             };
//             this.errorList.push(ele);
//         })
//       });
//       this.errors400.forEach(error => {
//         error.data.forEach(envData => {
//             let ele = {
//                 env: envData.env,
//                 errorType: error.errorType,
//                 errorName: error.errorName,
//                 jira: error.jira,
//                 jiraStatus: error.jiraStatus,
//                 count: envData.total,
//                 isNetNew: false // TO DO
//             };
//             this.errorList.push(ele);
//         })
//       });
//       this.errors404.forEach(error => {
//         error.data.forEach(envData => {
//             let ele = {
//                 env: envData.env,
//                 errorType: error.errorType,
//                 errorName: error.errorName,
//                 jira: error.jira,
//                 jiraStatus: error.jiraStatus,
//                 count: envData.total,
//                 isNetNew: false // TO DO
//             };
//             this.errorList.push(ele);
//         })
//       });
//       this.errorsGeneral.forEach(error => {
//         error.data.forEach(envData => {
//             let ele = {
//                 env: envData.env,
//                 errorType: error.errorType,
//                 errorName: error.errorName,
//                 jira: error.jira,
//                 jiraStatus: error.jiraStatus,
//                 count: envData.total,
//                 isNetNew: false // TO DO
//             };
//             this.errorList.push(ele);
//         })
//       });
//   }

//   getErrorsByType(type: string): any[] {
//     let errors = this.errorDetails.filter(
//         error => {
//             return error.errorType == type
//         }
//     );
//     return errors;
//   }

//   getErrorsByEnv(env: string): ErrorDetails[] {
//     let errors = this.errorDetails.filter(
//         error => {
//             let match = false;
//             error.data.forEach{envStats => {
//                 if (envStats.env == env) {
//                     match = true;
//                 }
//             }
//             }
//     });
//     return errors;
//   }

}

