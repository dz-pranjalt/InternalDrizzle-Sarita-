import { LightningElement } from 'lwc';

export default class HostLokkup extends LightningElement {

    selectedRecordId; //store the record id of the selected 
    handleValueSelcted(event) {
        this.selectedRecordId = event.detail;
    }
}