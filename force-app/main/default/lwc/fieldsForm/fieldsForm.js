import { LightningElement, api, wire, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import LeadObj from '@salesforce/schema/Lead';
import NameField from '@salesforce/schema/Lead.Name';
import PhoneField from '@salesforce/schema/Lead.Phone';
import CompanyField from '@salesforce/schema/Lead.Company';
import LeadStatus from '@salesforce/schema/Lead.Status';
import RatingField from '@salesforce/schema/Lead.Rating';
export default class FieldsForm extends LightningElement {
    @api value = '';
    @track isNameval = false;
    isPass = false;
    ispickSelect = false;
    isEmail = false;
    isLastName = false;
    isPincode = false;
    isCompany = false;


    @wire(getObjectInfo, { objectApiName: LeadObj })
    leadMetaData;

    @wire(getPicklistValues, {
        recordTypeId: '$leadMetaData.data.defaultRecordTypeId',
        fieldApiName: LeadStatus
    }) leadPickList;
    @wire(getPicklistValues, {
        recordTypeId: '$leadMetaData.data.defaultRecordTypeId',
        fieldApiName: RatingField
    }) ratingPickList;

    @api fieldsList = {
        Name: NameField,
        Phone: PhoneField,
        Company: CompanyField,
    };

    handleValidation(event) {
        this.value = event.target.value;
        console.log('Change Value ', this.value);
        if (this.value) {
            this.ispickSelect = true;
        }
    }
    handleName(event) {
        var leadName = event.target.value;
        console.log('leadName ', leadName)
        if (leadName) {
            this.isNameval = true;
            console.log('isName ', this.isNameval)
        }
        else {
            console.log('false ')
        }
    }
    handleEmail(event){
        var emailVal = event.target.value;
        if (emailVal) {
            this.isEmail = true
        }
    }
    handlePassword(event) {
        var passVal = event.target.value;
        if (passVal) {
            this.isPass = true
        }
    }
    handleLastName(event) {
        var lastNameVal = event.target.value;
        if(lastNameVal){
            this.isLastName = true;
        }
    }

    handleCompany(event) {
        var cmpValy = event.target.value;
        if(cmpValy){
            this.isCompany = true;
        }
    }
    handlePincode(event) {
        var pinVal = event.target.value;
        if(pinVal){
            this.isPincode = true;
        }
    }
    handlePhone(event) {
        var phoneVal = event.target.value;
        if(phoneVal){
            this.isPhone = true;
        }
    }


}