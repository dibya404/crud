import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms'; 
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash_board.model';


@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;

  constructor(private formbuilder :  FormBuilder,private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [' '],
      lastName : [' '],
      email : [' '],
      mobile : [' '],
      salary : [' ']
    })
    this.getAllEmployee();
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    //this.api.postEmploye(this.employeeModelObj)
    this.api.postEmploye(this.employeeModelObj)
    .subscribe({
      next:res=>{
        console.log(res);
        alert("Employee added successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },error:err=>{
        console.log(err)
      }
    })
   
    }
    getAllEmployee(){
      this.api.getEmployee(this.employeeData)
      .subscribe({
        next:res=>{
          this.employeeData = res;
        }
      })
      
    // .subscribe((res: any)=>
    //   {
    //     console.log(res);
    //     alert("Employee Added successfully");
    //   },
    //   (err: any)=>{
    //     alert("Something Went Wrong");
    //   }
    //   )

  }
  deleteEmployee(id : number)
  {
    this.api.deleteEmployee(id)
    .subscribe({
      next:res=>
      {
        console.log(res);
        this.getAllEmployee();
      }
    })
  }
  onEdit(row :  any)
  {
    this.employeeModelObj = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['salary'].setValue(row.salary)
  }
  updateEmployeeDetails()
  {
   
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    console.log(this.employeeModelObj.firstName)

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe({
      next:res=>
      {
        alert("Updated!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      }
    })
  }
}
