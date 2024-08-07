import { api, LightningElement } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ID_Field from '@salesforce/schema/Contact.Id';
import First_Name from '@salesforce/schema/Contact.FirstName';
import Last_name from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
const FIELD =[First_Name,Last_name,Email];
export default class UpdateUiRecord extends LightningElement {
 @api recordId;
 contsctList = FIELD;
 inputField = {};
 handleUpdate(event){
    event.preventDefault();
    console.log('click');
     const fields ={};
    //  fields[ID_Field.fieldApiName] = this.recordId;
    //  fields[First_Name.fieldApiName] = 'safi';
    //  fields[Last_name.fieldApiName] = 'malik';
    //  fields[Email.fieldApiName] = 'safi@gmail.com';


     fields[ID_Field.fieldApiName] = this.recordId;
     fields[First_Name.fieldApiName] = this.inputField.first;
     fields[Last_name.fieldApiName] = this.inputField.last;
     fields[Email.fieldApiName] =this.inputField.email;

     const recordInput = {fields} ;
     updateRecord(recordInput)
     //Promice In Lwc
     .then(result=>{
        console.log('result ',result);
       //Success
       this.dispatchEvent(new ShowToastEvent({
        title : 'Success',
        message:'Contact Update....!',
        variant :'success'
       })
       );
       
     }).catch(error=>{
        console.log('error ',error);
    //Error
    this.dispatchEvent(new ShowToastEvent({
        title : 'Error',
        message:`Getting this error ${error.message}`,
        variant :'error'
       })
    );
       

     })
    }
    handleInput(event){
        var name = event.target.name;
        var value = event.target.value;
        this.inputField[name] = value;

    }
}