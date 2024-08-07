import { LightningElement, wire } from 'lwc';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import Account_Object from '@salesforce/schema/Account';
import Rating_Field from '@salesforce/schema/Account.Rating';
export default class GetPicklistData extends LightningElement {
    value="";
 @wire(getObjectInfo,{objectApiName : Account_Object})
accountMetaData;

@wire(getPicklistValues,{recordTypeId :'$accountMetaData.data.defaultRecordTypeId',
fieldApiName : Rating_Field}) accountPickList;
hanleChange(event){
this.value = event.target.value;
console.log('Change Value ' ,this.value);

}
}