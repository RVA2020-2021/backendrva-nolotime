import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { STUDENT_URL } from "../app.constants";
import { Student } from "../models/Student";

@Injectable({
  providedIn: 'root'
})
export class StudentService{
  constructor(private httpClient: HttpClient){ }

//GET ALL STUDENT
  public getAllStudent(): Observable<any>{
    return this.httpClient.get(`${STUDENT_URL}`);
  }

//ADD NEW STUDENT
  public addStudent(student: Student):Observable<any>{
    student.id = 0;
    return this.httpClient.post(`${STUDENT_URL}`, student);
  }

//UPDATE EXISTING STUDENT
  public updateStudent(student:Student):Observable<any>{
    return this.httpClient.put(`${STUDENT_URL}`,student);
  }

//DELETE EXISTING STUDENT
  public deleteStudent(id:number):Observable<any>{
    return this.httpClient.delete(`${STUDENT_URL}/${id}`);
  }
}
