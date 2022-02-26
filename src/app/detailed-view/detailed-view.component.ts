import { Component, OnInit } from '@angular/core';
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
  errorDetails: ErrorDetails[];
  errors500: ErrorDetails[] = [];
  errors400: ErrorDetails[] = [];
  errors404: ErrorDetails[] = [];
  errorsGeneral: ErrorDetails[] = [];

  sub!: Subscription;
  errorMessage:string;
  
  errorList: ErrorView[] = [];

  nonProdEnv = 'QA';
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
    this.getErrorDetails();
    
  }

  getErrorDetails() {
    this.sub = this.tcmService.getTcmErrorSummary(1232343).subscribe({
        next: errorDetails => {
          this.errorDetails = errorDetails;
          this.groupErrorsByType();
          this.mapErrors();
          // this.splitErrorsByEnv();
         },
        error: err => this.errorMessage = err
      });
  }

  groupErrorsByType() {
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
    this.dataSource = new MatTableDataSource(this.errorDetails);
    console.log('dataSource', this.dataSource);
  }

  getCount(data: DetailByEnv[], env: string): number {
    let match = data.find(ele => ele.env == env);
    return match ? match.total : 0;
  }

  isNetNew(data: DetailByEnv[]): boolean {
    if (data) {
        let prod = data.find(ele => ele.env == 'PROD');
        let nonprod = data.find(ele => ele.env == this.nonProdEnv);
        return nonprod.total > 0 && prod.total <= 0;
    }
    return false;
  }

    mapErrors() {
        this.setErrorRows();
        this.setErrorLists(this.errorRows);
    }

    setErrorRows() {
        this.errorDetails.forEach(error => {
            let prodCount = this.getCount(error.data, 'PROD');
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

