import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  baseUrl:string = 'http://127.0.0.1:5000/lrs/api/config'

  constructor(private http: HttpClient) { }

  getRules() {    
    return this.http.get<any>(this.baseUrl+'/listRules')
  }

  addRule(data:any) {
    return this.http.post<any>(this.baseUrl+'/addRule', data)
  }
}
