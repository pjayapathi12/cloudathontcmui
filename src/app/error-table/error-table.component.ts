import { Component, Input, OnInit } from '@angular/core';
import { DetailByEnv, ErrorDetails, ErrorView, ErrorRow } from '../models/ErrorSummary';

@Component({
  selector: 'error-table',
  templateUrl: './error-table.component.html',
  styleUrls: ['./error-table.component.css']
})
export class ErrorTableComponent implements OnInit {
  @Input() errorData: ErrorRow[];
  closedJiraStatuses: string[] = [ 'Closed', 'Completed' ];

  constructor() {
    
  }

  ngOnInit(): void {
    console.log('before checkForIssues', this.errorData);
    // this.checkForIssues();
  }

  checkForIssues() {
    if (this.errorData) {
      this.errorData.forEach(function(error, index) {
        if (error.isNetNew) {
          if (this.closedJiraStatuses.indexOf(error.jiraStatus) == -1) {
            this.errorData[index].isFlagged = true;
            this.errorData[index].issueDescription = 'New Error - JIRA not closed';
          } else {
            this.errorData[index].isFlagged = true;
            this.errorData[index].issueDescription = 'New Error - JIRA closed';
          }
        }
        else if (!error.jira) {
          this.errorData[index].isFlagged = true;
          this.errorData[index].issueDescription = 'JIRA missing';
        }
      });
    }
  }

}

