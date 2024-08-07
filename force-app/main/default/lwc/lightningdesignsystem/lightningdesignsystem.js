import { LightningElement, track } from 'lwc';

export default class Lightningdesignsystem extends LightningElement {
    @track recordId;
    @track objectApiName;
    handleSuccess(){
        alert('Success!!...')
    }
}