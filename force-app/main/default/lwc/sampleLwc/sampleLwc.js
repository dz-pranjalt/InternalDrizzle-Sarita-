import { LightningElement,wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import LeadObj from '@salesforce/schema/Lead';
export default class SampleLwc extends LightningElement {
    @wire(getObjectInfo, { objectApiName: LeadObj })leadMetaData;

    handleClick(event){
        console.log('click')
        console.log('leadMetaData ',leadMetaData.data)
    }
}