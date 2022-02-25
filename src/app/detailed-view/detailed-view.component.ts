import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DetailByEnv, ErrorDetails, ErrorView } from '../models/ErrorSummary';

import { TcmService } from '../services/tcm-service';

@Component({
    selector: 'detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {
  errorDetails: ErrorDetails[];
  prodErrors: ErrorDetails[];
  qaErrors: ErrorDetails[];
  errors500: ErrorDetails[] = [];
  errors400: ErrorDetails[] = [];
  errors404: ErrorDetails[] = [];
  errorsGeneral: ErrorDetails[] = [];
  errorList: ErrorView[] = [];
  sub!: Subscription;
  errorMessage:string;

  constructor(private tcmService: TcmService) {
    
  }

  ngOnInit(): void {
    this.getErrorDetails();

    //this.groupErrorsByType();
    // this.errors500 = this.getErrorsByType('500');
    // this.errors400 = this.getErrorsByType('400');
    // this.errors404 = this.getErrorsByType('404');

   // this.splitErrorsByEnv();
    console.log('errorList', this.errorList);
  }

  getCount(data: DetailByEnv[], env: string): number {
    let match = data.find(ele => ele.env == env);
    return match ? match.total : 0;
  }

  isNetNew(data: DetailByEnv[]): boolean {
    if (data) {
        let prod = data.find(ele => ele.env == 'PROD');
        let nonprod = data.find(ele => ele.env == 'QA');
        return nonprod.total > 0 && prod.total <= 0;
    }
    return false;
  }

  getErrorDetails() {
    this.sub = this.tcmService.getTcmErrorSummary(1232343).subscribe({
        next: errorDetails => {
          this.errorDetails = errorDetails;
          this.groupErrorsByType();
          this.splitErrorsByEnv();
         },
        error: err => this.errorMessage = err
      });
  }

  getErrorsByType(type: string): any[] {
    let errors = this.errorDetails.filter(
        error => {
            return error.errorType == type
        }
    );
    return errors;
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
    )
  }

  

  splitErrorsByEnv() {  
    this.errors500.forEach(error => {
        error.data.forEach(envData => {
            let ele = {
                env: envData.env,
                errorType: error.errorType,
                errorName: error.errorName,
                jira: error.jira,
                jiraStatus: error.jiraStatus,
                count: envData.total,
                isNetNew: false // TO DO
            };
            this.errorList.push(ele);
        })
      });
      this.errors400.forEach(error => {
        error.data.forEach(envData => {
            let ele = {
                env: envData.env,
                errorType: error.errorType,
                errorName: error.errorName,
                jira: error.jira,
                jiraStatus: error.jiraStatus,
                count: envData.total,
                isNetNew: false // TO DO
            };
            this.errorList.push(ele);
        })
      });
      this.errors404.forEach(error => {
        error.data.forEach(envData => {
            let ele = {
                env: envData.env,
                errorType: error.errorType,
                errorName: error.errorName,
                jira: error.jira,
                jiraStatus: error.jiraStatus,
                count: envData.total,
                isNetNew: false // TO DO
            };
            this.errorList.push(ele);
        })
      });
      this.errorsGeneral.forEach(error => {
        error.data.forEach(envData => {
            let ele = {
                env: envData.env,
                errorType: error.errorType,
                errorName: error.errorName,
                jira: error.jira,
                jiraStatus: error.jiraStatus,
                count: envData.total,
                isNetNew: false // TO DO
            };
            this.errorList.push(ele);
        })
      });
  }

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

//   filterByEnv(errorDetails: DetailByEnv[], env: string): any {
//     let filteredErrors = errorDetails.filter(
//         error => {
//             error.env == env
//         }
//     );
//     return filteredErrors;
//   }

}

