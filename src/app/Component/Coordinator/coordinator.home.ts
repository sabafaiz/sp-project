import {Component} from '@angular/core';
import {OrganizationService2} from '../../providers/organization.service2';
import { CommonService } from '../../providers/common.service';

@Component({
  selector:'coordinator-home',
  templateUrl:'./coordinator.home.html',
  styleUrls:['./../Planner/objective/objective.css','./coordinator.home.css']
})
export class CoordinatorHome{
  public assignedActivities:any[] = [];
  constructor(private orgSer:OrganizationService2,private cs:CommonService){
    this.orgSer.fetchAssignedActivity().subscribe((res:any) =>{
      if(res.status != 204){
        this.assignedActivities = res;
      }else{
        this.assignedActivities = [];
      }
    })
  }

  saveResult(e:any){
    var result ={
      "currentLevel":e.currentLevel,
      "currentCost":e.currentCost,
      "departmentId":this.cs.getData("user_roleInfo")[0].departmentId,
      "quarterId":e.id
    }
    this.orgSer.saveQuarteResult(result,e.id).subscribe((res:any)=>{
      console.log("success",res);
    })
  }

  logout(){
    localStorage.clear();
  }
}