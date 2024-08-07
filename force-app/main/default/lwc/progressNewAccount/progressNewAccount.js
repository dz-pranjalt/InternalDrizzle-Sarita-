import { LightningElement ,api} from 'lwc';

export default class ProgressNewAccount extends LightningElement {


    handleNext(event){
        event.preventDefault();
      const nextEvent = new CustomEvent('next',{
        detail : {
                showContact : true,
                showAccount : false,
                showOpportunity : false
        }
      })
      this.dispatchEvent(nextEvent)
    }
}