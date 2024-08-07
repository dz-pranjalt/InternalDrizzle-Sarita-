import { api, LightningElement, track } from 'lwc';

export default class ChildMethod extends LightningElement {
    @api msg = 'Static Message';
    @track datet = new Date();
    
   @api
    childMethod(){
        this.datet = new Date();
    const dayDate = this.datet.getDay;
    console.log('day ',dayDate);
    }
}