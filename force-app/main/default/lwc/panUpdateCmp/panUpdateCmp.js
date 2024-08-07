import { LightningElement, track } from 'lwc';
import checkPANStatus from '@salesforce/apex/panUpdateApex.checkPANStatus';

export default class PanUpdateCmp extends LightningElement {

@track error;
@track panNumber;
@track validateBtnState = true;
@track finalOutput;

handleChange(event){
    this.panNumber = event.target.value.toUpperCase();
    this.UpdateBtnState();
    this.error = null;
    this.finalOutput = null;
}

handleCheckStatusClick(){
    checkPANStatus({panNumber : this.panNumber}).then((response=>{
   if(response!=null){
    const dataResponse = JSON.parse(response.replace(/\r?\n|\r/g,''));
    this.chechData(dataResponse);
   }

    })).catch((error=>{
        console.log('Error ',error.getMessage());
        this.error = error;
        alert(error);
    }))
}
UpdateBtnState(){
    this.validateBtnState = !(this.panNumber ==10);
}
chechData(panResponses){
    if(panResponses.status=='completed' && panResponses.result.source_output.status=='id_found'){

    this.finalOutPUT= panResponses.result.source_output.name_on_card
        this.source= panResponses.result.source_output.source;
    }else if(panResponses.status=='completed' && panResponses.result.source_output.status=='id_not_found'){
        //alert('Detatils not found');
        this.error='Detatils not found';
    }else{
        this.error=panResponses.message;
        //alert(panResponses.message);
        }

}

}