import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {

    number1;
    number2;

    hanleChange(event) {
        const val = event.target.value;
        const nameVal = event.target.name;
        if (nameVal == 'num1') 
        {
             this.number1 = val
            
            }
        else {
            
            this.number2 = val;
        
        }

    }
    handleSub() {
        const numSum = parseInt(this.number1) - parseInt(this.number2);
        alert(numSum)
    }
    handleAdition() {
        const numSum = parseInt(this.number1) + parseInt(this.number2);
        alert( numSum)

    }
doMult(){
    const numSum = parseInt(this.number1) * parseInt(this.number2);
        alert( numSum)
}
doDivi(){
        const numSum = parseInt(this.number1) / parseInt(this.number2);
        alert( numSum)
}
}