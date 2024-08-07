import { LightningElement } from 'lwc';

export default class ParentEvt extends LightningElement {

    handleSample(event){
        
        const msg = event.detail.msg;
        const pagen = event.detail.pagenum;
        const val = event.detail.val;
        alert('handle sample evt '+msg + ' '+pagen+' '+val);
        /*
         to get value
         const pageNo = event.detail.message(last name will be pass value variable name)
        */ 
    }
}