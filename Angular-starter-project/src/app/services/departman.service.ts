import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DEPARTMANI_ZA_FAKULTET, DEPARTMAN_URL } from '../app.constants';
import { Departman } from '../models/Departman';

@Injectable({
  providedIn: 'root'
})
export class DepartmanService {

  constructor(private httpClient: HttpClient) { }

  public getAllDepartmans():Observable<any>{
    return this.httpClient.get(`${DEPARTMAN_URL}`);
  }

  public getAllDepartmansForFakultet(fakultet: number): Observable<any>{
    return this.httpClient.get(`${DEPARTMANI_ZA_FAKULTET}/${fakultet}`);
  }

  public addDepartman(departman: Departman): Observable<any>{
    departman.id = 0;
    return this.httpClient.post(`${DEPARTMAN_URL}`, departman);
  }

  public updateDepartman(departman: Departman): Observable<any>{
    return this.httpClient.put(`${DEPARTMAN_URL}`, departman);
  }

  public deleteDepartman(id: number): Observable<any>{
    return this.httpClient.delete(`${DEPARTMAN_URL}/${id}`);
  }


}
