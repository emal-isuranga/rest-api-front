import { Component, OnInit } from '@angular/core';
import { GenaralService } from '../service/genaral.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  UserData: any[] = [];
  updeteForm: FormGroup;
  category: any[] = [];
  qualifications: any[] = [];
  selectQualifications: any[] = []
  qualificationsId: number;
  isRegister: boolean = false;

  constructor(
    private globalService: GenaralService,
    private router: Router
  ) {
    this.updeteForm = this.updeteFormGroup();
  }

  ngOnInit() {
    this.globalService.setUserData.subscribe(
      res => this.UserData = res
    )

    if (this.UserData.length == 0) {
      this.router.navigate(['']);
    }

    this.setUpdeteFormValue();
  }



  updeteFormGroup() {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      nic: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      // gender: new FormControl("", [Validators.required]),
      profession: new FormControl("", Validators.required),
      affiliation: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      // category: new FormControl("", Validators.required),
      // qualifications: new FormControl("", Validators.required)
    });
  }


  setUpdeteFormValue() {
    this.updeteForm.controls["name"].setValue(this.UserData['name']);
    this.updeteForm.controls["nic"].setValue(this.UserData['nic']);
    this.updeteForm.controls["profession"].setValue(this.UserData['profession']);
    this.updeteForm.controls["affiliation"].setValue(this.UserData['affiliation']);
    this.updeteForm.controls["email"].setValue(this.UserData['email']);
    this.updeteForm.controls["password"].setValue(this.UserData['password']);
  }

  public onSubmit() {
    let data = this.updeteForm.value;
    data['status'] = this.UserData['status'];
    data['type'] = this.UserData['type'];
    data['category_id'] = this.UserData['category_id'];
    data['qualifications_id'] = this.UserData['qualifications_id'];

    this.globalService.updeteStudentDetail(this.UserData['id'], data).subscribe(res => {
      if (res['status']) {
        swal.fire(
          'Updete Successful!',
          'Plesas login again!',
          'success'
        );
        this.router.navigate(['/']);
      }
    })
  }

}
