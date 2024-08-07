import { LightningElement, track } from 'lwc';

export default class HellowGav extends LightningElement {
    @track greeting = 'Gav';
    changeHandler(event){
        this.greeting = event.target.value;
    }
}