import { LightningElement } from 'lwc';

export default class LightningGetter extends LightningElement {
    firstNumber;
    secondNumber;

    handleChange(event){
        if(event.target.name === 'name1'){
            this.firstNumber = event.target.value;
        }
        if(event.target.name === 'name2'){
            this.secondNumber = event.target.value;
        }
    }

    get showSum(){
        if(this.firstNumber && this.secondNumber){
            return parseInt(this.firstNumber) + parseInt(this.secondNumber);
        }
    }
}