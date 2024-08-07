import { api, LightningElement } from 'lwc';

export default class ObjectRecordName extends LightningElement {
    @api recordId;
    @api objectApiName;

    constructor(){
        super();
        console.log('ObjectApiName Is -: ',this.objectApiName);
        console.log('Object Record Id -: ',this.recordId);
    }
}