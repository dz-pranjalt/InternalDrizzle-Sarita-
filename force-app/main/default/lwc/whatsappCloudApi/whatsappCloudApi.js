import { LightningElement,api,track,wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import sendMsg from '@salesforce/apex/whatsappCloudApiApex.sendMessage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const fields = [PHONE_FIELD];
export default class WhatsappCloudApi extends LightningElement {


    @api recordId;

    whatsappMsg ='';
    phoneNumber ='';
    samplePhone ='109012575363625';
    accessKey ='EAAJ1XCPW08MBAPZCZBQWcvRZAQ3WyrboV38qslwFZCcMUZAcaEItdjOmxstEXXfxAw4AQkqEVbiLeyTC48ZBEyJFjExJqwzk2llcxl7YUsvi0iWknABSEb4DuW9fCiJZAZCPnjJuAcJChDHyOPNHgsovHLxnHB2VJVijhOPP54qkI3f64p3Wcx5Unx9LeHVTq3qo4BwL3O2zNgZDZD';
    _title = 'Sample Title';
    message = 'Sample Message';
    variant = 'error';
    variantOptions = [
        { label: 'error', value: 'error' },
        { label: 'warning', value: 'warning' },
        { label: 'success', value: 'success' },
        { label: 'info', value: 'info' },
    ];


    @wire(getRecord,{recordId:'$recordId', fields })
    account;

    get getphone() {
        this.phoneNumber = getFieldValue(this.account.data, PHONE_FIELD);
        return getFieldValue(this.account.data, PHONE_FIELD);
    }

    sendMessage(){
        sendMsg({messageBody:this.whatsappMsg,phoneNumber:this.phoneNumber,accessKey:this.accessKey,
            samplePhone:this.samplePhone}).then(result=>{
            console.log('Final Response ==> ' + result);
            if(result =='Success'){
                this._title ="Success";
                this.message="Message Sent Successfully..!";
                this.variant="success";
                //this.showNotification();
                this.clearField();
            }
            else{
                console.log('Error ',result);
                this._title ="Error";
                this.message="Message Sent Failed..!"+result;
                this.variant="error";
                this.showNotification();
                this.clearField();
            }
        })
    }

    showNotification() {
        const evt = new ShowToastEvent({
            title: this._title,
            message: this.message,
            variant: this.variant,
        });
        this.dispatchEvent(evt);
    }

    clearField(){
        this.whatsappMsg='';
        this.phoneNumber='';
    }

    onWhatsappMsg(event){
        this.whatsappMsg=event.target.value;
    }
}