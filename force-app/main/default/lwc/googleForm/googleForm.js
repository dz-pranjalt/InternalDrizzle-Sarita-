import { LightningElement,track } from 'lwc';
import bg from '@salesforce/resourceUrl/bg';
import getFormData from '@salesforce/apex/googleFormClass.getFormData';
import Email__c from '@salesforce/schema/SignUp__c.Email__c';
import FirstName__c from '@salesforce/schema/SignUp__c.FirstName__c';
import Country__c from '@salesforce/schema/SignUp__c.Country__c';
import Password__c from '@salesforce/schema/SignUp__c.Password__c';
import LastName__c from '@salesforce/schema/SignUp__c.LastName__c';
import Phone__c from '@salesforce/schema/SignUp__c.Phone__c';
import Company__c from '@salesforce/schema/SignUp__c.Company__c';
import Pincode__c from '@salesforce/schema/SignUp__c.Pincode__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
export default class GoogleForm extends NavigationMixin(LightningElement) {
    bg = bg +'\n';
    countryOptions = [
        { "label": "India", "value": "India" },
        { "label": "Albania", "value": "Albania" },
        { "label": "Algeria", "value": "Algeria" },
        { "label": "Andorra", "value": "Andorra" },
        { "label": "Angola", "value": "Angola" },
        { "label": "Antigua & Deps", "value": "Antigua  & Deps"},
        { "label": "Argentina", "value": "Argentina" }
    ];

    @track isDisabled = false;
    @track SignEmail;
    @track signUpList ={
        FirstName__c :FirstName__c,
        Password__c : Password__c,
        Email__c :Email__c,
        Country__c : Country__c,
        LastName__c :LastName__c,
        Company__c : Company__c,
        Phone__c : Phone__c,
        Pincode__c : Pincode__c
    };
   
    handleName(event){
        this.signUpList.FirstName__c = event.target.value;
        console.log('FirstName ',this.signUpList.FirstName__c);
    }
    handlePassword(event){
        this.signUpList.Password__c = event.target.value;
        console.log('PassWord ',this.signUpList.Password__c);
    }
    handleEmail(event){
        this.signUpList.Email__c = event.target.value;
        console.log('EMail ',this.signUpList.Email__c);
        this.SignEmail = this.signUpList.Email__c;
        console.log(' this.SignEmail ', this.SignEmail);
    }
    handleCountry(event){
        this.signUpList.Country__c = event.target.value;
        console.log('Country ',this.signUpList.Country__c);
    }
    handleLastName(event){
        this.signUpList.LastName__c = event.target.value;
    }
    handleCompany(event){
        this.signUpList.Company__c = event.target.value;
        console.log('Company ',this.signUpList.Company__c);
    }
    handlePhone(event){
        this.signUpList.Phone__c = event.target.value;
        console.log('Phone ',this.signUpList.Phone__c);
    }
    handlePincode(event){
        this.signUpList.Pincode__c = event.target.value;
        console.log('Pincode ',this.signUpList.Pincode__c);
    }
    isInputValid(){
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(xy=>{
            if(!xy.checkValidity()) {
                xy.reportValidity();
                isValid = false;   
            }
        });
        return isValid;
    }
    signUp(){
        if(this.isInputValid()){   
            getFormData({sigList : this.signUpList,email:this.SignEmail})
            .then(result=>{
                console.log('result ',result);
                const event = new ShowToastEvent({
                    title: 'Success....!',
                    message:'Your registration has been successfully completed and mail has been send on the '+this.SignEmail+' mail',
                    variant :'success'
                });
                this.signUpList =[ ];
                this.dispatchEvent(event);

                 this[NavigationMixin.Navigate]({
                type:'standard__objectPage',
                attributes:{
                    objectApiName:'SignUp__c',
                    actionName:'home'
                },
            });
            this.signUpList = {};
    
            })
            .catch(error =>{
                console.log('Error ',error);
                const event = new ShowToastEvent({
                    title: 'Error!',
                    message:'Getting responce as an '+this.error.Message(),
                    variant :'error'
                });
                this.dispatchEvent(event);
            })
            
           
        }
        else{
            console.log('Not Valid')
            const event = new ShowToastEvent({
                title: 'Error!',
                message:'You have not fill value in required field',
                variant :'error'
            });
            this.dispatchEvent(event);
        }
        }
    }