import { LightningElement, track, wire } from 'lwc';
import searchMethod from '@salesforce/apex/lookupAccountToContactApex.getContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LookupAccountToContact extends LightningElement {
    @track searchKey = '';
    @track conList;
    @track error;
    handleSearch(event){
     this.searchKey = event.target.value;
     console.log('searchValue ',this.searchKey);

    }
    @wire(searchMethod,{accName :'$searchKey'})
    wiredSearchMethod({data,error}){
        if(data){
            console.log('data ',data);
            this.conList = data;
            this.error = undefined;
            const evt = new ShowToastEvent({
                title : 'Record serch successfully ',
                message : 'COntact record has been search successfully....!',
                variant:'success'
            });
            this.dispatchEvent(evt);
        }
        if(error){
            console.log('Error ',error);
           this.error = error;
           this.conList = undefined;
           const evt = new ShowToastEvent({
            title : 'Record not found ',
            message : 'There is no any contact record present for search account name',
            variant:'error'
        });
        this.dispatchEvent(evt);
        }
    }
}