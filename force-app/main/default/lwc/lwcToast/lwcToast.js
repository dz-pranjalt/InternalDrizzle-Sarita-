import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LwcToast extends LightningElement {
 @track name='Sarita'
    handleSuccess(){
        //Green Color
        const evt = new ShowToastEvent({
            title:'Record Created Successfully...',
            message:`Your record with Name is :- ${this.name}`,
            variant:'success',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);
    }
    handleError(){
        const evt = new ShowToastEvent({
            title:'Error Toast ',
            message:'Error Message',
            variant:'error',
            mode:'sticky'
        });
        this.dispatchEvent(evt);
    }
    handleInfo(){
        const evt = new ShowToastEvent({
            title:'Info Toast',
            message:'Info Warning',
            variant:'info',
            mode:'sticky'
        });
        this.dispatchEvent(evt);
    }
    handleWarning(){
        const evt = new ShowToastEvent({
            title:'Warning Toast',
            message:'Warning Message',
            variant:'warning',
            mode:'dismissable'
         });
         this.dispatchEvent(evt);
    }
}