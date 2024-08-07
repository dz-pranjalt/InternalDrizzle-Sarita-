import { LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';
export default class Summerlightningconfirm extends LightningElement {

  async  confirmHandle(){
      const result = await  LightningConfirm.open({
            message :"Whoude you like to refresh the page?",
            label:"Refresh Page",
            theme:"success",
            //variant:"headerless"//use to hide header
        })
        if(result){
            location.reload();
        }
    }
}