import { api, LightningElement } from 'lwc';

export default class RecordviewForm extends LightningElement {
    @api recordId;
    @api objectApiName;
    handleSubmit(){
        alert('Submit...!')
        /*
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.LastName = 'My Custom Last Name'; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
        */
    }
    handleSuccess(){
        alert('Success...!')
    }
    handleError(){
        alert('Error')
    }
}