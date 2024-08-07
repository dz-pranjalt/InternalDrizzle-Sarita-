import { LightningElement,track } from 'lwc';
// import Address_Field from '@salesforce/schema/Employee__c.Address__c';
// import Blood_Group_Field from '@salesforce/schema/Employee__c.Blood_Group__c';
// import DOB__Field from '@salesforce/schema/Employee__c.DOB__c';
// import Name__Field from '@salesforce/schema/Employee__c.Name__c';
// import phone_field from '@salesforce/schema/Employee__c.Phone__c';
// import EmailId__field from '@salesforce/schema/Employee__c.EmailId__c'
import insertEmployee from '@salesforce/apex/employeeApex.insertEmployee'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class EmployeeForm extends LightningElement {
    value = 'A';
    options =[
    {label:'A',value:'A'},
    {label:'B',value:'B'},
    {label:'B+',value:'B+'},
    {label:'O',value:'O'},
    {label:'o+',value:'o+'},
  ]
//  listItem = {
//     Address:Address_Field,
//     BloodGroup:Blood_Group_Field,
//     DOB:DOB__Field,
//     Name:Name__Field,
//     phone:phone_field,
//     emilId :EmailId__field
// };

@track address;
@track DOB;
@track phone;
@track scoreObjCity;
@track emilId;

handleChange(event){
    var nameValue = event.target.name;
    var inpuValue = event.target.value;
    if(nameValue === 'last'){
    
        this.address = inpuValue;
    }
    else if(nameValue === 'DOB'){
      
        this.DOB = inpuValue;
    }
    else if(nameValue === 'phone'){
        this.phone = inpuValue;
    }
    else if(nameValue === 'email'){
        this.emilId = inpuValue;
    }
  
    
}
isValidInput(){
    let isValid = true;
    let inputFields = this.template.querySelectorAll(".validate");
    inputFields.forEach(s=>{
            if(!s.checkValidity()){
                console.log('16 ');
                s.reportValidity();
                isValid = false
            }
        
    });
    return isValid;
}
handleEmployee(){
    if(this.isValidInput()){
        console.log('valid check');
        //this.isDisable = true;
        insertEmployee({address : this.address,DOB:this.DOB,phoneName:this.phone,emilName:this.emilId})
        .then(result=>{
            console.log('Result ',result);
            this.listItem = { };
            const toast =  new ShowToastEvent({
                title : 'Success',
                message : 'Record Has been created successfully...!',
                variant : 'success'
            });
            this.dispatchEvent(toast);
        }).catch(error=>{
            console.log('error ',error);
            const toast =  new ShowToastEvent({
                title : 'Error',
                message : JSON.stringify(error),
                variant : 'error'
            });
            this.dispatchEvent(toast);
           
        })

    }
    else{
        console.log('not valid');   
    }
}
dateval;


get dateValue(){
  if(this.dateval == undefined)
  {
    this.dateval = new Date().toISOString().substring(0, 10);
  }
  return this.dateval;
}

/*changedate(event){
  this.dateval = event.target.value;
}*/
}