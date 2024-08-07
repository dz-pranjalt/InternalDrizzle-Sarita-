import { LightningElement,track } from 'lwc';
import insertContac from '@salesforce/apex/contactInsertLwc.insertContac';
import lastName from '@salesforce/schema/Contact.LastName';
import email from '@salesforce/schema/Contact.Email';
import phone from '@salesforce/schema/Contact.Phone';
import title from '@salesforce/schema/Contact.Title';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';

export default class ContatcDataLwc extends NavigationMixin(LightningElement) {
 @track contactRec = {
  LastName : lastName,
    Email : email,
    Phone : phone,
    Title : title
}
hanleLastName(event){
this.contactRec.LastName = event.target.value;
console.log('LastName ',this.contactRec.LastName);
}

hanlePhone(event){
this.contactRec.Phone = event.target.value;
console.log('Phone ',this.contactRec.Phone);
}
hanleEmail(event){
this.contactRec.Email = event.target.value;
console.log('Email ',this.contactRec.Email);
}
hanleTitle(event){
this.contactRec.Title = event.target.value;
console.log('Title ',this.contactRec.Title);

}
hanleSubmit(){
 insertContac({con : this.contactRec})
.then(result=>{
  console.log('result ',result);
 const evt = new ShowToastEvent({
    title : 'Contact has been inserte successfully ....!',
    message : '',
    variant : 'success'
});
this.dispatchEvent(evt);

/*this[NavigationMixin.Navigate]({
 type: 'standard__objectPage',
attribute:{
    objectApiName :'Opportunity',
actionName : 'list'
            },
            state :{
                    filterName :'Recent'
            }
});*/
let pageReferrence ={
            type :'standard__objectPage',
            attributes :{
            objectApiName :'Contact',
                actionName : 'list'
                
            },
            state :{
                    filterName :'Recent'
            }
        };
        this[NavigationMixin.Navigate](pageReferrence,true);
    

})
.catch(error=>{
 console.log('Error ',error);
console.log('Error message',error.getMessage());
const evt = new ShowToastEvent({
    title : 'Error',
    message : 'Contact has not been inserte successfully becoz of ' + error.getMessage(),
    variant : 'error'
});
this.dispatchEvent(evt);
})
}

}