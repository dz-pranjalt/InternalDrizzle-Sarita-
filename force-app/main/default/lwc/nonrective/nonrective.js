import { LightningElement } from 'lwc';

export default class Nonrective extends LightningElement {
message ="Non Reactive Property"
handleChange(){
  this.message = "Inside Method";
console.log('Message is '+message);     

}

}