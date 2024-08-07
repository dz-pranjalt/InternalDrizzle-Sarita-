import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import contact_object from '@salesforce/schema/Contact';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';

export default class ContactCreator extends LightningElement {
objectApiName = contact_object;
fields = [FirstName,LastName,Email];

handleSuccess(event){
 const toastEvt = new ShowToastEvent({
    type:'Contact Created',
    message : 'Record ID:'+ event.detail.id,
    variant : 'success'

});
this.dispatchEvent(toastEvt);

}
}