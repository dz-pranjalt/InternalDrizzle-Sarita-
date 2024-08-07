import { LightningElement, wire } from 'lwc';
import callApex from '@salesforce/apex/lwcApex.getAccData';
export default class CallApex extends LightningElement {


    @wire(callApex) accList;
}