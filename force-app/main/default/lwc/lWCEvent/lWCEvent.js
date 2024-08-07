import { LightningElement } from 'lwc';

export default class LWCEvent extends LightningElement {

hanleChange(event){
const val = event.target.value;
const lab = event.target.label;
console.log('Value Is '+val+' Label is '+lab);
}

}