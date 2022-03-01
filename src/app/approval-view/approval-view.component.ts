import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorRow } from '../models/ErrorSummary';
import { TcmInfo } from '../models/tcmInfo';
import { TcmService } from '../services/tcm-service';

@Component({
  selector: 'approval-view',
  templateUrl: './approval-view.component.html',
  styleUrls: ['./approval-view.component.css']
})
export class ApprovalViewComponent implements OnInit {
  @Input() errorData: ErrorRow[];
  closedJiraStatuses: string[] = [ 'Closed', 'Completed' ];

  sub!: Subscription;
  tcmList: TcmInfo[];

  constructor(private tcmService: TcmService) {
    
  }

  ngOnInit(): void {
    console.log('before checkForIssues', this.errorData);
    this.getAllTCMs(false);
    // this.checkForIssues();
  }

  getAllTCMs(isMock: boolean) {
    this.sub = this.tcmService.getAllTCMs(isMock).subscribe({
        next: tcmDetails => {
            console.log('tcmDetails from mock', tcmDetails);
            this.tcmList = tcmDetails;
            // TO DO
        },
        error: err => console.log("error::", err)
    });
  }

}

