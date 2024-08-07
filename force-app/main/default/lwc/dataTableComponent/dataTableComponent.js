import { LightningElement,wire } from 'lwc';
import getContact from '@salesforce/apex/lwcDataTableApex.getContact';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
const actions =[
  {label:'Details',name:'details'},
  {label:'delete',name:'delete'},
];
const columns = [
    { label: 'Name', fieldName: 'recordUrl',type:'url', typeAttributes : {
      label:{
        fieldName:'Name'
      },
      target:'_blank'
    }, 
    //Used for Icon 
    cellAttributes:{
      iconName : {
        fieldName:'contactIcon',
      },
      iconPosition:'left',
      iconAlternativeText:'contact Icon'
  
    }
  
  },
    { label: 'Phone', fieldName: 'Phone', type: 'phone',sortable:true,editable:true},
    { label: 'Title', fieldName: 'Title', type: 'text',sortable:true,editable:true },
    { label: 'Email', fieldName: 'Email', type: 'email',sortable:true,editable:true },
    { label: 'AccountId', fieldName: 'AccountId', type: 'text' },
    { label: 'Account Name', fieldName: 'accountUrl', type: 'url',
    //Used For Redirect on recordpage
    typeAttributes :{
      label : {
        fieldName: 'ACCOUNT_NAME'
      },
      target:'_blank'
    } ,
  //Used For Icon
  cellAttributes:{
    iconName : {
      fieldName:'accountIcon',
    },
    iconPosition:'right',
    iconAlternativeText:'Account Icon'

  }
},
{ type:"button",
    fixedWidth:150,
    typeAttributes:{
      label:'View details',
      name:'view details',
      value:'viewDetails',
      variant:'brand',
      class:'scaled-down'
    }
  },
  {type:'action',typeAttributes:{rowActions:actions}},
];

export default class DataTableComponent extends LightningElement {
    sortBy = 'Phone';
    sortedDirection = 'asc';
    contactData;
    columnList = columns;
    error;

    draftValues = []

    refreshApexData;

    selectedRows = [];
    selectedRowList =[];
    @wire(getContact)
    // wiredData({ error, data }) {
    //   if (data) {
    //     console.log('Data', data);
    // let parseData = JSON.parse(JSON.stringify(data));
    // let baseUrl = 'https://'+location.host+'/';
    // parseData.forEach(contact => {
    //     if(contact.AccountId){ 
    //     contact.ACCOUNT_NAME = contact.Account.Name;
    //     contact.recordUrl = baseUrl+contact.Id;
    //     console.log('Contact Url ',contact.recordUrl)
    //     contact.accountUrl = baseUrl+contact.AccountId;
    //     contact.accountIcon = 'standard:account';
    //     contact.contactIcon = 'standard:contact'
    //     }
    // });
    //     this.contactData = data;
    //   } 
      
    //   if (error) {
    //     console.error('Error:', error);
    //     this.error = error;
    //   }
    wiredData(result) {
      this.refreshApexData = result;
      if (result.data) {
        console.log('Data',result. data);
    let parseData = JSON.parse(JSON.stringify(result.data));
    let baseUrl = 'https://'+location.host+'/';
    parseData.forEach(contact => {
        if(contact.AccountId){ 
        contact.ACCOUNT_NAME = contact.Account.Name;
        contact.recordUrl = baseUrl+contact.Id;
        console.log('Contact Url ',contact.recordUrl)
        contact.accountUrl = baseUrl+contact.AccountId;
        contact.accountIcon = 'standard:account';
        contact.contactIcon = 'standard:contact'
        }
    });
        this.contactData = result.data;
      }  
      else if (result.error) {
        console.error('Error:', result.error);
        this.error = result.error;
      }
    }
    handleRowAction(event){
     let action = event.target.action;
    
     const row = event.target.row;
     switch (action.name) {
      case 'details':
        alert('details alert ',row.Id)
        break;
        case 'delete':
          this.handleDelete(row.Id);
          break;
     }
    }
    handleDelete(recordId){
      alert('Deleting record ',recordId )
    }
    handlertData(event){
    this.sortBy = event.target.fieldName;
    this.sortedDirection = event.target.sortDirection;
    this.sortData(sortBy,sortedDirection);
    }
    sortData(fieldName,direction){
    let parseData = JSON.parse(json.stringify(this.contactData));
    let keyValue=(a)=>{
       return a[fieldName]
    }; 
    let isReverse = direction ==='acs'? 1: -1;
    parseData.sort((x,y)=>{
      x=keyValue(x)?keyValue(x):'';
      y=keyValue(y)?keyValue(y):'';
      return isReverse *((x>y)-(y>x));
    });
    this.contactData = parseData;
    }
    handleSave(event){
      this.draftValue = event.detail.draftValues;
      console.log('Object draftValue ',this.draftValue);
      const recordInput = event.detail.draftValues.slice().map(draft=>{
         const fields = Object.assign({},draft);
         console.log('fields ',fields);
         return {fields};
      });
      window.console.log('draftValue String',JSON.stringify(event.detail.draftValues) );
      const promises = recordInput.map(recordInput => updateRecord(recordInput));
      Promise.all(promises).then(result=>{
        console.log('result ',result);
        this.draftValue = [];
      return refreshApex(this.refreshApexData);
       
      }).catch(error=>{
        console.log('Error ',error);
      })
    }
}