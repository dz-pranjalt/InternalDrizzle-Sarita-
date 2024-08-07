import { LightningElement } from 'lwc';

export default class DisconnectedCallback extends LightningElement {
    isShow = true;
    handleClick(){
        this.isShow = this.isShow?false:true;
    }

}