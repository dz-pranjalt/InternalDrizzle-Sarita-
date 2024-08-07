import { LightningElement } from 'lwc';

export default class GetSetterLwc extends LightningElement {

uppercase = 'Initial Text';

get itemName(){
alert('Getter')
 return this.uppercase;

}
set itemName(value){
alert('Setter')
 this.uppercase = value.toUpperCase();
}
handleClick(){
 this.itemName = 'Inside Method';
}
}