import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CustomValidationForFields extends LightningElement {
    contact = {};
    @track isDisabled = false;
    countryOptions = [
        { "label": "India", "value": "India" },
        { "label": "Albania", "value": "Albania" },
        { "label": "Algeria", "value": "Algeria" },
        { "label": "Andorra", "value": "Andorra" },
        { "label": "Angola", "value": "Angola" },
        { "label": "Antigua & Deps", "value": "Antigua  & Deps"},
        { "label": "Argentina", "value": "Argentina" }
    ];
    isInputValid(){
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(xy=>{
            if(!xy.checkValidity()) {
                xy.reportValidity();
                isValid = false;   
            }
            //this.contact[xy.name] = xy.value;
        });
        return isValid;
    }
    createContact(){
        if(this.isInputValid()){   
            console.log('contact ');
            this.isDisabled = true;
            const event = new ShowToastEvent({
                title: 'Toast message',
                message: 'You have successfully signUp....!',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
        }
        else{
            const event = new ShowToastEvent({
                title: 'Toast message',
                message: 'Please fill data into required fields',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
        }
    }
   /* handleChange(event){
        var currentTarget = event.target.label;
        if(currentTarget == 'Name'){
            var name = this.template.querySelector(".input1");
            var namVal = name.value;
            if(!namVal){
                name.setCustomValidity("Please enter the data");
            }
            else{
                name.setCustomValidity("");
            }
            name.reportValidity("");
        }
        else if(currentTarget === 'Select'){
            console.log('else if')
            var checkClass = this.template.querySelector(".isActive");
            var checkVal = checkClass.checked;
            console.log('checkVal 1',checkVal);
            if(checkVal == false){
                console.log('checkVal ',checkVal);
                checkClass.setCustomValidity("Please check the box");
            }
            else{
                checkClass.setCustomValidity(" ");
            }
            checkClass.reportValidity(" ");
        }
    }*/
    handleCLick(event){
        console.log('Click');
    }
}