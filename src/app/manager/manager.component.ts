import { Component, OnInit } from '@angular/core';
import { GenaralService } from '../service/genaral.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  public registerStudent: any[] = [];
  public approvedStudent: any[] = [];
  public category: any[] = [];
  public qualifications: any[] = [];
  public isApproved: boolean = false;
  public categoryId: number;
  public qualificationsId: number;
  public searchId: number;

  constructor(
    private globalService: GenaralService,
    private router: Router
  ) { }

  ngOnInit() {
    this.globalService.getRegister().subscribe(serverResp => {
      if (serverResp['status']) {
        this.registerStudent = serverResp['student_list']
      } else {
        swal.fire(
          'Error!',
          'Please check!',
          'error'
        );
      }
    });

    this.globalService.getApprodStudent().subscribe(serverResp => {
      if (serverResp['status']) {
        this.approvedStudent = serverResp['student_list']
      } else {
        swal.fire(
          'Error!',
          'Please check!',
          'error'
        );
      }
    });

    this.globalService.getQualifications().subscribe(serverResp => {

      this.category = serverResp['category'];
      this.qualifications = serverResp['qualifications'];
    })
  }


  setApproed(id) {

    this.globalService.setApprodStudent(id).subscribe(serverResp => {
      if (serverResp['status']) {
        swal.fire(
          'Approed!',
          'New member add!',
          'success'
        );
        this.registerStudent = serverResp['student_list']
        console.log(serverResp['status'])
      } else {
        swal.fire(
          'Error!',
          'Please check!',
          'error'
        );
      }
    });
  }

  rejectStudent(id) {
    this.globalService.setRejectStudent(id).subscribe(serverResp => {
      if (serverResp['status']) {
        swal.fire(
          'Reject!',
          'reject student!',
          'success'
        );
        this.registerStudent = serverResp['student_list']
        console.log(serverResp['status'])
      } else {
        swal.fire(
          'Error!',
          'Please check!',
          'error'
        );
      }
    });
  }

  getCategoryId() {
    let data = {
      key: 'category_id',
      value: this.categoryId
    }

    this.globalService.filterStudent(data).subscribe(serverResp => {
      if (serverResp['status']) {
        this.approvedStudent = serverResp['student_list']
      } else {
        swal.fire(
          'Empty Value!',
          'Not any data for this category!',
          'warning'
        );
      }
    });
  }

  getQualificationsId() {

    let data = {
      key: 'qualifications_id',
      value: this.qualificationsId
    }

    this.globalService.filterStudent(data).subscribe(serverResp => {
      if (serverResp['status']) {
        this.approvedStudent = serverResp['student_list']
      } else {
        swal.fire(
          'Empty Value!',
          'Not any data for this qualifications!',
          'warning'
        );
      }
    });
  }

  searchStudentId() {
    let data = {
      key: 'id',
      value: this.searchId
    }


    this.globalService.filterStudent(data).subscribe(serverResp => {
      if (serverResp['status']) {
        this.approvedStudent = serverResp['student_list']
      } else {
        swal.fire(
          'Empty Value!',
          'Not any data for this qualifications!',
          'warning'
        );
      }
    });
  }

}
