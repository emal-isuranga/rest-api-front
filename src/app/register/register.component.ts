import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { GenaralService } from '../service/genaral.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

  contactForm: FormGroup;
  category: any[] = [];
  qualifications: any[] = [];
  selectQualifications: any[] = []
  qualificationsId: number;

  constructor(
    private globalService: GenaralService,
    private router: Router
  ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {
    this.globalService.getQualifications().subscribe(serverResp => {

      this.category = serverResp['category'];
      this.qualifications = serverResp['qualifications'];
    })
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      nic: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      // gender: new FormControl("", [Validators.required]),
      profession: new FormControl("", Validators.required),
      affiliation: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      qualifications: new FormControl("", Validators.required)
    });
  }

  public onSubmit() {
    let data = this.contactForm.value;
    data['status'] = 'REGISTER';
    data['type'] = 'student';
    this.globalService.studentRegister(data).subscribe(res => {
      if (res['status']) {
        swal.fire(
          'Your are register!',
          'go to maneger approed!',
          'success'
        ).then((result) => {
          if (result.value) {
            this.router.navigate(['/']);
          }
        })
      }
    })
  }

  setSelectQualifications() {
    console.log(this.qualificationsId)
    this.selectQualifications = [];
    this.qualifications.forEach(element => {
      if (element.category_id == this.qualificationsId) {
        let data = {
          category_id: element.category_id,
          name: element.name
        }
        this.selectQualifications.push(data)
      }
    });

    console.log(this.selectQualifications)
  }
}
