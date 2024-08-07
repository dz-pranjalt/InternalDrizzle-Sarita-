import { api, LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
// import { updateRecord } from 'lightning/uiRecordApi';
// import { deleteRecord } from 'lightning/uiRecordApi';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import CREATED_FIELD from '@salesforce/schema/Account.CreatedDate';
import Name_Field from '@salesforce/schema/Account.Name';
import { getFieldValue,getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
// const fields = ['Account.Name','Account.Phone'];
const fields = [REVENUE_FIELD, CREATED_FIELD, NAME_FIELD];
export default class LdsUiRecord extends LightningElement {
    @api recordId;
    name = '';

    //UI getRecord
    @wire(getRecord, { recordId: '$recordId', fields })
    account;

    get revenue() {
        console.log('Data ',this.account);
        return getFieldValue(this.account.data, REVENUE_FIELD);
    }

    get created() {
        return getFieldValue(this.account.data, CREATED_FIELD);
    }

    get expiration() {
        return getFieldValue(this.account.data, Name_Field);
    }
    handleNameChange(event){
        this.name = event.target.value;
    }

    //UI Create Account
    createAccount(){
        const fields ={};
        fields[Name_Field.fielApiName] = this.name;
        const inputrecordId = {apiName : ACCOUNT_OBJECT.objectApiName,fields};
        createRecord(inputrecordId)
        .then(result=>{

        }).catch(error=>{

        })
    }
}