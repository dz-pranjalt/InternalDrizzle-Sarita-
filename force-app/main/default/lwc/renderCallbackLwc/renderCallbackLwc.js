import { LightningElement } from 'lwc';
import template1 from './template1.html';
import renderParent from './renderCallbackLwc.html';
export default class RenderCallbackLwc extends LightningElement {

    isShow = true;
    render(){
       return this.isShow?renderParent:template1; 
       
    }
    handleClick(){
        this.isShow = this.isShow?false:true;
    }
}