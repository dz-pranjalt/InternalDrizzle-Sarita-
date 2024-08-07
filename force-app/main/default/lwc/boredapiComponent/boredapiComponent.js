import { LightningElement,wire } from 'lwc';
import getAPiData from '@salesforce/apex/boredapiApex.getAPiData';
export default class BoredapiComponent extends LightningElement {
    apiData;
     //@wire(getAPiData) wiredApiData;
     
    callAPI(){
        console.log('button click');
        getAPiData({})
        .then((result)=>{
            console.log('result ',result[0]);
            this.apiData = result[0];
        })
        .catch((error)=>{
            console.log('error ',error.boddy.message);
        })
    }
    
}