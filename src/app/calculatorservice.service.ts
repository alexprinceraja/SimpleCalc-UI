import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Calculator } from './calcModel';

@Injectable({
  providedIn: 'root'
})
export class CalculatorserviceService {

  constructor(private http: HttpClient) { }

  calculateRequestGeneration(operator: string, firstValue: any, secondValue: any) {
    let params = new HttpParams();
    params = params.append('input1', firstValue);
    params = params.append('input2', secondValue);

    return this.http.get("http://localhost:8080/calculator/" + operator, { params: params });
  }

  getHistory() {
    return this.http.get<Calculator[]>("http://localhost:8080/calculator/history");
  }
}
