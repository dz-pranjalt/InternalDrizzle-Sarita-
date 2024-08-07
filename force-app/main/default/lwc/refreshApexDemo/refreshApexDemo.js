import { LightningElement, wire } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import getAccountData from '@salesforce/apex/refreshApexClass.getAccountData';
import updateRecord from '@salesforce/apex/refreshApexClass.updateRecord';
const columns = [
    { label:'Name', fieldName:'Name'},
    {label:'Phone', fieldName:'Phone'},
    {label:'Industry', fieldName:'Industry'}
];
export default class RefreshApexDemo extends LightningElement {

   cols = columns;
   selectedRecord;
   accountList =[];
   error;
   wiredList = [];

   //Working with refreshApex we need to defined method like this
   @wire(getAccountData)
   accList(result){
    this.wiredList = result;
    if(result.data){
        console.log('dTA ',result.data)
        this.accList = result.data;
        console.log('List ',this.accList)
        this.error = undefined;
    }
    else if(result.error){
        this.error = result.error;
        this.accList = [];
    }
   }
   handleRowSelection(event){
    if(event.detail.selectedRows.length > 0){
        this.selectedRecord = event.detail.selectedRows[0].Id;
    }
   }
   deleteRecord(){
    deleteRecord(this.selectedRecord)
    .then(() =>{
refreshApex(this.wiredList)

    })
    .catch(error=>{

    })
   }
   updateRecord(){
    updateRecord({ recordId: this.selectedRecord })
      .then(result => {
        console.log('Result', result);
      })
      .catch(error => {
        console.error('Error:', error);
    });
   }
}