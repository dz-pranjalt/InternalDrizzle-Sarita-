import { LightningElement } from 'lwc';
import getListContactData from '@salesforce/apex/ContactController.getListContactData';
import {getAccounts} from './asyncLearningService.js';
export default class AsyncLearning extends LightningElement {


  async handleCallNormal(){
    console.log('button is clicked whose label is Call Async Child Function Normally')
    let contact = this.template.querySelector('c-child-async').handleParentCall();
    console.log('button click is finishing now & single contact is ',contact);
    }
    handleCallfromCallback(){
        console.log('button is clicked whose label is Call Async Function from callback In Parent');
        getListContactData()
        .then(async(result) => {
            console.log('list contact from server', result);
            let contact = this.template.querySelector('c-child-async').handleParentCall();
            console.log('button click is finishing now & single contact is', contact);
        }).catch((error) => {
            console.log('error ',error);
        });
    }
   async handleCallfromService(){
    console.log('button is clicked whose label is Call Async Function from Service JS In Parent');
    let accountlist = await getAccounts();
    console.log('button click is finishing now & list of account is ', accountlist);
    }
    
}