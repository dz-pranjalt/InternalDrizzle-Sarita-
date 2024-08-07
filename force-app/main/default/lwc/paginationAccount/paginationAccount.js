import { LightningElement, track,wire } from 'lwc';
import getAccountData from '@salesforce/apex/getAccounts.getAccountData';
export default class PaginationAccount extends LightningElement {

    @track visibleAccounts;
    @track totalAccounts;
    @track error;
    @wire(getAccountData)
    wireAccount({data,error}){
        if(data){
            this.totalAccounts = data;
            console.log('data ',data);
            console.log('account ',this.totalAccounts);
            this.error = undefined;
        }
        if(error){
            this.error = error;
            console.log('error');
            this.totalAccounts = undefined;
        }
    }
    updateAccountHandler(event){
        this.visibleAccounts = [...event.detail.records];
        console.log('visibale ',this.visibleAccounts);
    } 
}