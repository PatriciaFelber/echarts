import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  private reflectivityPointwise = '/api/reflectivity';
  private thicknessPointwise = '/api/thickness';

  constructor(private http: HttpClient) { }

  public getReflectivityData(): Observable<any> {
    return this.http.get(this.apiUrl + this.reflectivityPointwise);
  }

  public getThicknessData(): Observable<any> {
    return this.http.get(this.apiUrl + this.thicknessPointwise);
  }
}
