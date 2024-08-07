import { api, LightningElement, wire } from 'lwc';
import getContactData from '@salesforce/apex/LwcRefreshApexClass.getContactData';
import {refreshApex} from '@salesforce/apex';
import { deleteRecord,updateRecord,createRecord,getRecord,getFieldValue } from 'lightning/uiRecordApi';
import updateDepartment from '@salesforce/apex/LwcRefreshApexClass.updateDepartment';

export default class LwcRefreshApex extends LightningElement {
    contactColumns = [
    {label:'Contact Name',fieldName:'Name'},
    {label:'Contact Title',fieldName:'Title'},
    {label:'Contact Department',fieldName:'Department'},
    {label:'Contact Phone',fieldName:'Phone'}
    ];
// @api recordId;
// @api objectApiName;
 conList =[];
 wiredList =[];
 error;
 selectedRow;
//  conList =[

//     {Name:'Test1',Title:'Test Title',Department:'IT',Phone:'9807654321'},
//     {Name:'Test2',Title:'Test Title2',Department:'IT2',Phone:'9807654322'},
//  ];
    /*
    //Wired Method
    @wire(method) accList;
    accList.data

    //Different way
 @wire(method)
 wireMethod({data,error}{
    if(data){

    }
    if(error){

    }
    UIRecord
 })
    
    */ 
   //RefreshAPex
    @wire(getContactData)
    conList(result){
        console.log('recult is ',result);
        this.wiredList = result;
        if(result.data){
            this.conList = result.data;
            console.log('conList ',this.conList);
            this.error = undefined;

        }
        else if(result.error){
            this.error = result.error;
            this.conList = [];
        }
    }
    handleSelection(event){
        if(event.detail.selectedRows.length > 0){
        this.selectedRow = event.detail.selectedRows[0].Id;
        console.log('Selected Id ',this.selectedRow);
        }

    }
    handleDelete(){
        deleteRecord(this.selectedRow)
        .then(result=>{
            refreshApex(this.wiredList);
            console.log('delete result ',result)
        }).catch(error=>{
            console.log('delet error ',error)
        })
    }
    // handleUpdate(){
    //     updateDepartment({recordId:this.selectedRow})
    //     .then(result=>{
    //         console.log('result ',result);

    //     }).catch(erro=>{
    //         console.log('error')
    //     })

    // }
}