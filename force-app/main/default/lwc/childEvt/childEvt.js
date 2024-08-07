import { api, LightningElement } from 'lwc';

export default class ChildEvt extends LightningElement {
@api val ='textval';
    handleClick(){
        /*const evt = new CustomEvent('sample');
        this.dispatchEvent(evt);
        
         to pass value need to used*/
         const evt = new CustomEvent('sample',
         {
            detail :{msg :'msg from child',pagenum:'23',val:this.val}
         }
         );
        this.dispatchEvent(evt);
        
    }
}