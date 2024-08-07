import { LightningElement,api,wire } from 'lwc';
import getConData from '@salesforce/apex/CreateOpportunity.getConData';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
const columns = [
    { label: 'First Name', fieldName: 'FirstName',sortable: true },
    { label: 'Last Name', fieldName: 'LastName',sortable: true },
    { label: 'Title', fieldName: 'Title',sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone',sortable: true },
    { label: 'Email', fieldName: 'Email', type: 'email',sortable: true },
      { label: "Account Name", fieldName: "recordLink", type: "url",
        typeAttributes: {label: {fieldName: "AccountName"}, tooltip: "Name", target: "_blank", linkify: true} }
];
export default class CreateOpportunity extends LightningElement {
 @api recordId = "";
  error;  
    columns = columns;
    @api contact=[];
    @api selectedContact = [];
    connectedCallback()
    {
        console.log('recordId ',this.recordId);
        getConData({recId: this.recordId})
        .then((result,error) => {
            if (result) {
                let contactData = JSON.parse(JSON.stringify(result));      
            contactData.forEach(record => {
                if (record.AccountId) {
                    record.recordLink = "/" + record.AccountId;  
                    record.AccountName = record.Account.Name;
                }
            });
            this.contact = contactData ;
                console.log('conList ',this.contact)
            } else if (error) {
                console.error('error ',error);
            }
        })
    }
    handleRowSelection=event=>{
       console.log('selected ')
        var selectedRows = event.detail.selectedRows;
        console.log('selectedRows ',selectedRows)
        for(let i=0;i<selectedRows.length;i++){
            console.log('selectedRows : ',selectedRows[i]);
            this.selectedContact.push(selectedRows[i]);
            return this.selectedContact;
        }
       
         
    }
    
}