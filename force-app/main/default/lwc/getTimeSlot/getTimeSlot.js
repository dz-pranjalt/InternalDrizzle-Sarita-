import { LightningElement, api } from 'lwc';
import createLeadEvent from '@salesforce/apex/createLeadAppointment.createLeadEvent'; 
import getTimeSlots from '@salesforce/apex/createLeadAppointment.getTimeSlots';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class GetTimeSlot extends NavigationMixin(LightningElement) {
    @api recordId;
    value = '26-05-2023 12:00';
    isSlotSelected = false;
    @api pinVal;
    @api selectedSlot;
    @api showSlot = false;
    options = []
    listOfSlot = [];
    
    handlePincode(event){
        this.pinVal = event.target.value;

    }
    handleInputCheck(event){
        console.log('check')
    }
    getPincodeDetails(){
        console.log('get Click');
        console.log('get pinval ',this.pinVal.length);
        if(this.pinVal.length > 6  || this.pinVal.length < 6){
        const evt = new ShowToastEvent({
            title: 'Toast Error',
            message: 'Enter valid pincode of 6 digits',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);

    }
    else{
        getTimeSlots()
        .then(result=>{
            
            console.log('result 26 ',result);
            let pp=[];
            // for(var i=0;i<result.length;i++){
            //     this.listOfSlot.push(result[i]);
            // }
            for(var key in result)
            {
                console.log('pp  ',key);
               
                console.log('listOfSlot 26 ',this.listOfSlot);
                pp.push({
                    label:result[key],
                    value:result[key]
                })
            }
            console.log('pp>>>>',pp);
            this.options=pp;
             this.showSlot = true;
        })
        .catch(error=>{
            console.log('error 29 ',error)
        })
    } 

    }
    handleChange(event) {       
        this.selectedSlot = event.detail.value;        
        console.log('selectedSlot!!! ' + this.selectedSlot);
        this.isSlotSelected = true;
        
    }
    submitAppointment(){
        console.log('call apex ',this.selectedSlot.length);
        if(this.selectedSlot.length > 1){
            const evt = new ShowToastEvent({
                title: 'Toast Error',
                message: 'Please select single slot',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
        else{
        createLeadEvent({recId : this.recordId,SelectedSlot: this.selectedSlot})
        .then(result=>{
            console.log('result ',result);
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.recordId,
                    actionName: 'view'
                }
            });
            const evt = new ShowToastEvent({
                title: 'Toast Success',
                message: 'Lead appointment created sucessfully',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        })
        .catch(error=>{
            console.log('error',error);
            const evt = new ShowToastEvent({
                title: 'Toast Error',
                message: 'Some unexpected error',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        })
    }
}
}