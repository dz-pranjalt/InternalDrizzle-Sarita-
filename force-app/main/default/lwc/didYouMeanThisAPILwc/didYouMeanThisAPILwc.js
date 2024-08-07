import { LightningElement,api } from 'lwc';
import getResult from '@salesforce/apex/DidYouMeanThisAPIApex.getResult'
export default class DidYouMeanThisAPILwc extends LightningElement {

@api apiEndpoint;
@api changVal;
    handleChange(event){
        var valChange  = event.target.value;
        this.changVal = valChange;
        console.log('mytext ',this.changVal);
    }
    
    buttonClick(event){
        getResult({text: encodeURIComponent(this.changVal.trim())})
        .then((resp)=>{
            console.log('resp ',resp);
            let parsedData = JSON.parse(resp);
            console.log('parsedData ',parsedData);
             console.log('parsedData,resp ',parsedData.result);
        var message = parsedData.result;
        console.log('message ',message);
        if (parsedData.is_modified === true) {
            console.log('21') 
            this.handleConfirm(message);
        }
        })
        .catch((error)=>{
            console.log('error ',error);
        })
    }
        async handleConfirm(message) {
            console.log('message 32 ',message);
      const result = await LightningPrompt.open({
            message: 'this is the alert message',
            theme: 'error', 
            label: 'Error!', 
            variant: 'header',
        });
        console.log('result  ',result);
        // if (result === true) { 
        //     console.log('40  ',result);
        //     this.changVal = message;
        // }
        }
}