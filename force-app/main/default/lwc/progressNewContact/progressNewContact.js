import { LightningElement } from 'lwc';

export default class ProgressNewContact extends LightningElement {

    handlePrevious(event){
        event.preventDefault(event);
        const newEvt = new CustomEvent('previous',{
            detail:{
                showContact : false,
                showAccount : true,
                showOpportunity : false
            }
            
        });
        this.dispatchEvent(newEvt);
    }
    
    handleNext(event){
        event.preventDefault(event);
        const newEvt = new CustomEvent('next',{
            details:{
                showContact : false,
                showAccount : false,
                showOpportunity : true
            }
        });
        this.dispatchEvent(newEvt);
    }
}