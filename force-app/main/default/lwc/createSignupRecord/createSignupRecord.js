import { LightningElement, track } from 'lwc';
import FirstName from '@salesforce/schema/SignUp__c.FirstName__c';
import Email from '@salesforce/schema/SignUp__c.Email__c';
import password from '@salesforce/schema/SignUp__c.Password__c';
import phone from '@salesforce/schema/SignUp__c.Phone__c';
import pincode from '@salesforce/schema/SignUp__c.Pincode__c';
import creatSignup from '@salesforce/apex/signupClass.createSignup';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CreateSignupRecord extends LightningElement {
    @track signupList ={
        FirstName__c : FirstName,
        Email__c : Email,
        Password__c : password,
        Phone__c : phone,
        Pincode__c:pincode
    };
    
    handleFirstName(event){
  this.signupList.FirstName__c = event.target.value;
    }
    handleEmail(event){
   this.signupList.Email__c = event.target.value;
    }
    handlePhone(event){
   this.signupList.Phone__c = event.target.value
    }
    handlePincode(event){
        this.signupList.Pincode__c = event.target.value;
    }
    handlePassword(event){
  this.signupList.Password__c = event.target.value;
    }
     isInputValid(){
        let isValid = true;
        let inputfields = this.template.this.template.querySelectorAll('.validate'); //Input fetch
        inputfields.forEach(x => {
            if(!x.checkValidity()){
                x.reportValidity();
                isValid = false;
            }
            
        });
        return isValid;
    }
    handleSignup(){
        console.log('click')
        if(this.isInputValid()){
            creatSignup({signupList:this.signupList})
            .then(result=>{
                console.log('result ',result)
                const evt = new ShowToastEvent({
                    type:'Record Created',
                    message:'Sign up record has been created successfully.....!',
                    variant:'success'
                });
                this.dispatchEvent(evt);
            }).catch(error=>{
                console.log('error',error);
                const evt = new ShowToastEvent({
                    type:'Record Failed',
                    message:'Sign up record has been Failed....!',
                    variant:'error'
                });
                this.dispatchEvent(evt);
            }) ; 
            this.dispatchEvent(evt);
        }
        else{
            const evt = new ShowToastEvent({
                type:'Validation Failed',
                message:'Please enter all mandatory fields..',
                variant:'error'
            });
            this.dispatchEvent(evt);
        }
    }
/*firsName,email,password,phone,pincode */

}