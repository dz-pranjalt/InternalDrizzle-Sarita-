import { LightningElement,track } from 'lwc';

export default class AccordianLwc extends LightningElement {

     @track inputFields = [{ id: 0, firstName: '', lastName: '',email:'' }];

    addInputFields() {
        const newInputField = { id: Date.now(), firstName: '', lastName: '' };
        this.inputFields.push(newInputField);
    }
    handleFirstNameChange(event){
          const inputId = event.target.dataset.id;
        const firstName = event.target.value;
        this.updateInputField(inputId, 'firstName', firstName);
    }
    handleLastNameChange(event){
          const inputId = event.target.dataset.id;
        const lastname = event.target.value;
        this.updateInputField(inputId, 'firstName', firstName);
    }handleEmailChange(event){
          const inputId = event.target.dataset.id;
        const email = event.target.value;
        this.updateInputField(inputId, 'firstName', firstName);
    }
     handleClick() {
        const newInputField = { id: Date.now(), firstName: '', lastName: '' };
        this.inputFields.push(newInputField);
    }
    updateInputField(inputId, fieldName, fieldValue) {
        const index = this.inputFields.findIndex(field => field.id === parseInt(inputId, 10));
        
        if (index !== -1) {
            this.inputFields[index][fieldName] = fieldValue;
        }
    }
   
}