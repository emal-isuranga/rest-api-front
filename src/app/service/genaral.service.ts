import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenaralService {

  httpOptions: any;
  private userData = new BehaviorSubject([])
  public setUserData = this.userData.asObservable();

  constructor(
    private http: HttpClient,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
  }



  // get approed student data
  getApprodStudent() {

    let url = "http://127.0.0.1:8000/api/registerStudent";

    return this.http.get(url);
  }

  login(data) {

    let url = "http://127.0.0.1:8000/api/login";
    return this.http.post(url, {
      email: data.email,
      password: data.password,
    }).pipe(tap(resp => {
      if (resp['status']) {
        this.userData.next(resp['student_list'][0])
      }

    }), catchError((error) => {
      return error.statusText;
    }));

  }

  studentRegister(data) {
    let url = "http://127.0.0.1:8000/api/student";
    return this.http.post(url, {
      email: data.email,
      password: data.password,
      name: data.name,
      nic: data.nic,
      profession: data.profession,
      affiliation: data.affiliation,
      category_id: data.category,
      qualifications_id: data.qualifications,
      status: data.status,
      type: data.type,
    }).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  setApprodStudent(id) {
    let url = "http://127.0.0.1:8000/api/approed";
    return this.http.post(url, {
      id: id
    }).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  setRejectStudent(id) {

    let url = "http://127.0.0.1:8000/api/student";
    return this.http.delete(url + "/" + id).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));

  }

  getRegister() {
    let url = "http://127.0.0.1:8000/api/withOutRegister";
    return this.http.get(url);
  }

  updeteStudentDetail(id, data) {

    let url = "http://127.0.0.1:8000/api/student";

    return this.http.put(url + "/" + id, data).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  filterStudent(data) {

    let url = "http://127.0.0.1:8000/api/filter";
    return this.http.post(url, {
      key: data.key,
      value: data.value
    }).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  getQualifications() {

    let url = "http://127.0.0.1:8000/api/qualifications";
    return this.http.get(url);

  }

}
