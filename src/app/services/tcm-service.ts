import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorDetails, ErrorSummary } from "../models/ErrorSummary";
import { TcmInfo } from "../models/tcmInfo";

@Injectable({
  providedIn: 'root'
})
export class TcmService {
private tcmUrl = 'api/tcm/tcm.json';
  private tcmErrorSummaryUrl = 'api/tcm/tcmErrorSummary.json';
  private tcmResourceErrorDetailsUrl = 'api/tcm/tcmResourceErrorDetails.json';

  constructor(private http: HttpClient) { }

  getTcmInfo(tcmId:number): Observable<TcmInfo> {
    return this.http.get<TcmInfo>(this.tcmErrorSummaryUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getTcmErrorSummary(tcmId:number): Observable<ErrorDetails[]> {
    return this.http.get<ErrorDetails[]>(this.tcmErrorSummaryUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  getResourceErrorDetails(tcmId:number, resourceName: string): Observable<ErrorSummary> {
    return this.http.get<ErrorSummary>(this.tcmResourceErrorDetailsUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
