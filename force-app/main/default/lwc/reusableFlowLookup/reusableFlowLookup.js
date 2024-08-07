import { LightningElement } from 'lwc';

export default class ReusableFlowLookup extends LightningElement {

    selectedValue;
    get inputVariables() {
        return [
            {
                name: 'fieldApiName',
                type: 'String',
                value: 'AccountId'
            },
            {
                name: 'objectApiName',
                type: 'String',
                value: 'Contact'
            },
            {
                name: 'inputLabel',
                type: 'String',
                value: 'Select Account Record'
            },
            {
                name: 'required',
                type: 'Boolean',
                value: false
            }
        ];
    }

    handleStatusChange(event) {
        console.log('handleStatusChange', JSON.stringify(event.detail));
    }

    handleLookupSelection(event) {
        console.log('handleLookupSelection', JSON.stringify(event.detail));
        this.selectedValue = event.detail;
        console.log('selectedValue', this.selectedValue);
    }
}