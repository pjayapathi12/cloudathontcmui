import { Component, OnInit } from '@angular/core';
import { ErrorDetails, DetailByEnv, DailyStats, ErrorView } from '../errors.model';

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

  constructor() {
    
  }

  ngOnInit(): void {
    this.getErrorDetails();

    this.groupErrorsByType();
    // this.errors500 = this.getErrorsByType('500');
    // this.errors400 = this.getErrorsByType('400');
    // this.errors404 = this.getErrorsByType('404');

    this.splitErrorsByEnv();
    console.log('errorList', this.errorList);
  }

  getErrorDetails() {
    this.errorDetails = [
        {
            errorName: "clientauth/mergeForms",
            errorType: "500",
            jira: "ABC-2202",
            jiraStatus: "Open",
            resourceName: "clientauth",
            data: [
                {
                    env: "PROD",
                    total: 10,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 6
                        },
                        {
                            date: "2022/02/24",
                            count: 4
                        }
                    ]
                },
                {
                    env: "QA",
                    total: 5,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 3
                        },
                        {
                            date: "2022/02/24",
                            count: 2
                        }
                    ]
                },
                {
                    env: "QA1",
                    total: 0,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 0
                        },
                        {
                            date: "2022/02/24",
                            count: 0
                        }
                    ]
                }
            ]
        },
        {
            errorName: "clientauth/formSearch",
            errorType: "500",
            jira: "ABC-2202",
            jiraStatus: "Closed",
            resourceName: "clientauth",
            data: [
                {
                    env: "PROD",
                    total: 0,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 0
                        },
                        {
                            date: "2022/02/24",
                            count: 0
                        }
                    ]
                },
                {
                    env: "QA",
                    total: 5,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 3
                        },
                        {
                            date: "2022/02/24",
                            count: 2
                        }
                    ]
                },
                {
                    env: "QA1",
                    total: 10,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 10
                        },
                        {
                            date: "2022/02/24",
                            count: 0
                        }
                    ]
                }
            ]
        },
        {
            errorName: "clientauth/getUserDetails",
            errorType: "400",
            jira: "",
            jiraStatus: "",
            resourceName: "clientauth",
            data: [
                {
                    env: "PROD",
                    total: 7,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 3
                        },
                        {
                            date: "2022/02/24",
                            count: 4
                        }
                    ]
                },
                {
                    env: "QA",
                    total: 23,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 14
                        },
                        {
                            date: "2022/02/24",
                            count: 9
                        }
                    ]
                },
                {
                    env: "QA1",
                    total: 0,
                    dailyStats: [
                        {
                            date: "2022/02/25",
                            count: 0
                        },
                        {
                            date: "2022/02/24",
                            count: 0
                        }
                    ]
                }
            ]
        }
    ]
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

