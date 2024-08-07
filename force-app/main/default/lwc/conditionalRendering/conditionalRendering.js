import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
isTom = false;
isJerry = false;
hanleTom(){
this.isTom = true;
this.isJerry = false;
}
hanleJerry(){
this.isTom = false;
this.isJerry = true;
}
}