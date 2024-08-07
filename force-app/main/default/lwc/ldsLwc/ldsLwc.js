import { LightningElement,api } from 'lwc';
import Name_Field from '@salesforce/schema/Lead.Name';
import Phone_field from '@salesforce/schema/Lead.Phone';
import company_Fields from '@salesforce/schema/Lead.Company';
import title_field from '@salesforce/schema/Lead.Title';
export default class LdsLwc extends LightningElement {
    //Its used to access current record page ID
 @api recordId;
 @api objectApiName;
 fields=[Name_Field,Phone_field,company_Fields,title_field];
 handleSubmit(){
    alert('Record Submited')
 }
 handleSuccess(){
    alert('Record Success')
 }
 handleError(){
    alert('Record Error')
 }

}