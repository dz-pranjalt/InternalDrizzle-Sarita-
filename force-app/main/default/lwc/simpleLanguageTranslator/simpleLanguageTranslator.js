import { LightningElement } from 'lwc';
import headerLab from '@salesforce/label/c.headerLab';
import changeLang from '@salesforce/apex/simpleLanguageTranslator.changeLang';
import para from '@salesforce/label/c.para';	
export default class SimpleLanguageTranslator extends LightningElement {
    value = 'English';
    options =[
        {label:'English',value:'en_US'},
        {label:'German',value:'de'},
        {label:'Japanese',value:'ja'},
    ]
    
    label = {
        headerLab,
        para
    };

    handleChange(event){
     this.value = event.target.value;
     changeLang({lang : this.value})
     .then(result=>{
        console.log('result ',result);
        location.reload();    
     }).catch(error=>{
     alert('error ',error);
     })
    }
    
}