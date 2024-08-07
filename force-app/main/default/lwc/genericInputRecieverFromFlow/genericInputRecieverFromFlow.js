import { LightningElement, api } from 'lwc';

export default class GenericInputRecieverFromFlow extends LightningElement {

    value;

    @api get inputValue(){
        return this.value;
    }
    set inputValue(receivedValue){
        this.setAttribute('inputValue',receivedValue);
        this.value = receivedValue;
        this.handleValueChange();
    }

    label;
    @api get inputLabel(){
        return this.label;
    }
    set inputLabel(receivedLabel){
        this.setAttribute('inputLabel',receivedLabel);
        this.label = receivedLabel;
        this.handleValueChange();
    }

    get payload(){
        return{
            id:this.value,
            name : this.label
        };
    }
    handleValueChange(){
        console.log('payload 33 ',this.payload);
        console.log('inputLabel  ',this.inputLabel);
        console.log('inputValue  ',this.inputValue);
        const selectedEvent = new CustomEvent('receivedValue',{
            detail : this.payload , bubbles: true , composed: true
        });
        this.dispatchEvent(selectedEvent);
    }
}