import { LightningElement,api } from 'lwc';

export default class DualRecordForm extends LightningElement {
    @api fieldList = ["Name", "Site", "AccountNumber", "Phone"]; //harcoded the values assuming objectApiName is Account for demo purpose
    showEditField;
    @api recordId;
    @api objectApiName;

    handleSuccess(event){
        this.showEditField = false;
    }
    handleEdit(event){
        this.showEditField = ! this.showEditField
        console.log('showEdit ',this.showEditField);
    }
    handleCancel(event){
        this.showEditField = false;
    }
}