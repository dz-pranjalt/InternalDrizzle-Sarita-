import { LightningElement, track } from 'lwc';
import saveInputData from '@salesforce/apex/addProductApex.saveInputData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const ACCEPTED_FORMATS = ['.pdf', '.png', '.jpg'];
export default class AddProduct extends LightningElement {
    showTable = false;
    
    @track inputFields = [{ id: 0, firstName: '', lastName: '', email: '', file: undefined }];
    acceptedFormats = ACCEPTED_FORMATS.join(',');

    addInputFields() {
        this.showTable = true;
        const newInputField = { id: Date.now(), firstName: '', lastName: '', email: '', file: undefined };
        this.inputFields.push(newInputField);
    }
    handleFirstNameChange(event) {
        const inputId = event.target.dataset.id;
        const firstName = event.target.value;
        this.updateInputField(inputId, 'firstName', firstName);
    }
    handleLastNameChange(event) {
        const inputId = event.target.dataset.id;
        const lastName = event.target.value;
        this.updateInputField(inputId, 'lastName', lastName);
    }
    handleEmailChange(event) {
        const inputId = event.target.dataset.id;
        const email = event.target.value;
        console.log('email ', email);
        this.updateInputField(inputId, 'email', email);
    }
    handleClick() {
        const newInputField = { id: Date.now(), firstName: '', lastName: '', email: '' };
        this.inputFields.push(newInputField);
    }
    handleCancelClick(event) {
        const inputId = event.target.dataset.id;
        this.removeInputField(inputId);
    }
    handleFileUpload(event) {
        const inputId = event.target.dataset.recordId;
        const uploadedFiles = event.detail.files;

        if (uploadedFiles.length > 0) {
            this.updateInputField(inputId, 'file', uploadedFiles[0]);
        }
    }
    removeInputField(inputId) {
        const index = this.inputFields.findIndex(field => field.id === parseInt(inputId, 10));

        if (index !== -1) {
            this.inputFields.splice(index, 1);
        }
    }
    handleFileChange(event) {
        const inputId = event.target.dataset.id;
        const file = event.target.files[0];
        this.updateInputField(inputId, 'file', file);
    }
    updateInputField(inputId, fieldName, fieldValue) {
        const index = this.inputFields.findIndex(field => field.id === parseInt(inputId, 10));

        if (index !== -1) {
            this.inputFields[index][fieldName] = fieldValue;
        }
    }
    handleSaveClick() {
        const inputDataToSave = this.inputFields.map(inputField => {
            return {
                firstName: inputField.firstName,
                lastName: inputField.lastName,
                email: inputField.email
            };
        });
        console.log('inputDataToSave ', inputDataToSave.length);
        if (inputDataToSave.length > 0) {
            saveInputData({ inputDataList: inputDataToSave })
                .then(result => {
                    console.log('Data saved successfully:', result);
                    const event = new ShowToastEvent({
                        title: 'Toast message',
                        message: 'Record created successfully',
                        variant: 'success',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(event);
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                    const event = new ShowToastEvent({
                        title: 'Toast message',
                        message: 'Getting error ' + error.boddy.message,
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(event);
                });
        }
        else {
            const event = new ShowToastEvent({
                title: 'Toast message',
                message: 'Please add the product....!',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);

        }
    }

}