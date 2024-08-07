import { LightningElement, api } from 'lwc';
import getContactData from '@salesforce/apex/ContactController.getContactData';
export default class ChildAsync extends LightningElement {

    //Public method
 @api handleParentCall(){
    return getContactData()
    .then(result=>{
        console.log('result ',result);
        return result;
    })
    .catch(error=>{
        console.log('error ',error);
    })
 }

}