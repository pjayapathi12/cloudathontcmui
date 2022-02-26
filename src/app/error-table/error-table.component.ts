import { Component, Input, OnInit } from '@angular/core';
import { DetailByEnv, ErrorDetails, ErrorView, ErrorRow } from '../models/ErrorSummary';

@Component({
  selector: 'error-table',
  templateUrl: './error-table.component.html',
  styleUrls: ['./error-table.component.css']
})
export class ErrorTableComponent implements OnInit {
  @Input() errorData: ErrorRow[];

  constructor() {
    
  }

  ngOnInit(): void {
    
  }

}

