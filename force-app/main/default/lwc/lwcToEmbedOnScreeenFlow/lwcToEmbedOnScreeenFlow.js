import { LightningElement, api } from 'lwc';
import {FlowAttributeChangeEvent} from 'lightning/flowSupport';
export default class LwcToEmbedOnScreeenFlow extends LightningElement {
 @api name = 'testParam';

    handleChange(event){
        this.name = event.target.value;
        this.dispatchEvent(new FlowAttributeChangeEvent('name',this.name));
    }
}