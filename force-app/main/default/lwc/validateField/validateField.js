import { LightningElement, track } from 'lwc';

export default class ValidateField extends LightningElement {
    @track isDisable = false;
    counOptions = [
        {"label":"India","value":"India"},
        {"label":"French","value":"French"},
        {"label":"Albanie","value":"Albanie"}
    ];

    isValidInput(){
        let isValid = true;
        let inputFields = this.template.querySelectorAll(".validate");
        inputFields.forEach(s=>{
                if(!s.checkValidity()){
                    console.log('16 ');
                    s.reportValidity();
                    isValid = false
                }
            
        });
        return isValid;
    }
    handleValidation(){
        if(this.isValidInput()){
            console.log('valid check');
            this.isDisable = true;
        }
        else{
            console.log('not valid');   
        }
    }
}