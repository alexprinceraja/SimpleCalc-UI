import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Calculator } from './calcModel';

@Injectable({
  providedIn: 'root'
})
export class CalculatorserviceService {

  constructor(private http: HttpClient) { }

  sendGETRequestWithParameters(operation : string, first : string, second : string){   
    let params = new HttpParams();
    params = params.append('input1', first);
    params = params.append('input2', second);

    return this.http.get("http://localhost:8080/calculator/"+operation, {params: params});
   }

   getHistory(){
    return this.http.get<Calculator[]>("http://localhost:8080/calculator/history");
   }
}
