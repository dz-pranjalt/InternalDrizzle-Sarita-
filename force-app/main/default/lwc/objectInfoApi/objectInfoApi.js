import { LightningElement,wire } from 'lwc';
import { getObjectInfos,getPicklistValues,getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import AccountObject from '@salesforce/schema/Account';
import contactObject from '@salesforce/schema/Contact';
import Industry from '@salesforce/schema/Account.Industry';

//Static data For Picklist
const industryval  =[
    {label:'Test',value:'IT'},
    {label:'Test1',value:'E&TC'},
    {label:'Test2',value:'CS'},
]
export default class ObjectInfoApi extends LightningElement {
    value;
    options = industryval;
    options2;

    //Get Object Info
    @wire(getObjectInfos, { objectApiNames: [AccountObject,contactObject] })
    getObjectData;

    //Get Picklist Values
    @wire(getPicklistValues,{recordTypeId:'012000000000000AAA',fieldApiName:Industry})
    wireData({data,error}){
        if(data){
            console.log('data ',data);
            this.options2 = data.values;
            console.log('optios ',this.options2)
        }
        if(error){
            console.log('error ',error)
        }
    }

    //Get Picklist value by real record type
    @wire(getPicklistValuesByRecordType,{recordTypeId:'012000000000000AAA',objectApiName:contactObject})
    wireData({data,error}){
        if(data){
            console.log('data ',data);
            this.options2 = data.values;
            console.log('optios ',this.options2)
        }
        if(error){
            console.log('error ',error)
        }
    }

    handleChange1(){
       console.log('Industry ')
    }
    handleChange(event){
        console.log('value click ');
    }
   
   
}