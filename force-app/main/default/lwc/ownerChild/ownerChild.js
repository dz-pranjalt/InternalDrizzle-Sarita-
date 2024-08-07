import { api, LightningElement, track, wire } from 'lwc';
import getKnowledge from '@salesforce/apex/getOwnerInfor.getKnowledge';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import owner from '@salesforce/schema/Account.OwnerId';
export default class OwnerChild extends LightningElement {
   @api value;
//  @api keyVal ;
//  @api userData;


//  handleSearch(event){
//         const searchVal = event.detail;
//         this.keyVal = searchVal;
//     }
//  @wire(getKnowledge,{searchVal:'$keyVal'})
//  wiredMethod(data,error){
//     if(data){
//      this.userData = data.Name;
//      console.log('data ',data);
//      console.log('userData ',this.userData);
//     }
//     if(error){

//     }
//  }


@wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: owner })
    
wiredMethod(data,error){
       if(data){
        
        console.log('data ',data);
        
       }
       if(error){
   
       }
    }
   
 
}