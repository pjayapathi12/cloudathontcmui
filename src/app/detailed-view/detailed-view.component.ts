import { Component, OnInit } from '@angular/core';
import { ErrorDetails, DetailByEnv, DailyStats } from '../errors.model';

@Component({
    selector: 'detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {
  errorDetails: ErrorDetails;

  constructor() {
    
  }

  ngOnInit(): void {
    this.getErrorDetails();
  }

  getErrorDetails() {
    this.errorDetails = {
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
            }
        ]
      }
  }

}

