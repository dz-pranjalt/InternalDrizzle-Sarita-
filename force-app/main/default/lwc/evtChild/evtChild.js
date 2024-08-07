import { api, LightningElement, track } from 'lwc';

export default class EvtChild extends LightningElement {
    @track val = 'test';
    @api
    childMethod(){
        alert('From child method');
    }
}