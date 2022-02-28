import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TemplateDefinitionBuilder } from "@angular/compiler/src/render3/view/template";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorDetails, ErrorSummary } from "../models/ErrorSummary";
import { TcmInfo } from "../models/tcmInfo";

@Injectable({
  providedIn: 'root'
})
export class TcmService {
  private tcmUrl = 'https://bannisters-webapp-springboot-sql.azurewebsites.net/getTCMDetails';
  private allTcmsUrl = 'https://bannisters-webapp-springboot-sql.azurewebsites.net/getAllTCMs';
  private allTcmsMockUrl = 'api/tcm/allTcms.json';
  private tcmErrorSummaryUrl = 'https://bannisters-webapp-springboot-sql.azurewebsites.net/getSummaryView';
  private tcmErrorSummaryMockUrl = 'api/tcm/tcmErrorSummary.json';
  private tcmResourceErrorDetailsUrl = 'https://bannisters-webapp-springboot-sql.azurewebsites.net/getDetailedView';
  private tcmResourceErrorDetailsMockUrl = 'api/tcm/tcmResourceErrorDetails.json';

  constructor(private http: HttpClient) { }

  getTcmInfo(tcmId:string): Observable<TcmInfo> {
    return this.http.get<TcmInfo>(this.tcmUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAllTCMs(isMock: boolean): Observable<TcmInfo[]> {
    let url = isMock ? this.allTcmsMockUrl : this.allTcmsUrl;
    return this.http.get<TcmInfo[]>(url)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getTcmErrorSummary(tcmId:string, resourceName: string, isRedis: string): Observable<ErrorDetails[]> {
    let req = {
      tcm: tcmId,
      resourceName: resourceName
    };
    let url = `${this.tcmErrorSummaryUrl}?redis=${isRedis}`;
    return this.http.post<ErrorDetails[]>(url, req)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getTcmErrorSummaryMock(tcmId:string, resourceName: string): Observable<ErrorDetails[]> {
    return this.http.get<ErrorDetails[]>(this.tcmErrorSummaryMockUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  getResourceErrorDetails(tcmId:string, resourceName: string, isRedis: string): Observable<ErrorDetails[]> {
    let req = {
      tcm: tcmId,
      resourceName: resourceName
    };
    let url = `${this.tcmResourceErrorDetailsUrl}?redis=${isRedis}`;
    return this.http.post<ErrorDetails[]>(url, req)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getResourceErrorDetailsMock(tcmId:string, resourceName: string): Observable<ErrorDetails[]> {
    return this.http.get<ErrorDetails[]>(this.tcmResourceErrorDetailsMockUrl)
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
