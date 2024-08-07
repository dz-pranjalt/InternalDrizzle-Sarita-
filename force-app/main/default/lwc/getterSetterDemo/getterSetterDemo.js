import { LightningElement } from 'lwc';

export default class GetterSetterDemo extends LightningElement {

    upperCaseItem = 'Initial Text';
    get isItemName(){
        return this.upperCaseItem;
    }
    set isItemName(value){
        this.upperCaseItem = value.toUpperCase();
    }
    handleClick(){
        this.isItemName = 'After Click';
    }
}