import { api, LightningElement } from 'lwc';

export default class LwcAura extends LightningElement {

@api msg;
    handleClick(){
        
        const evt = new CustomEvent("sample",{
            detail :{
                message :"Lwc Cmp"
            }
        });
        this.dispatchEvent(evt);
    }
}