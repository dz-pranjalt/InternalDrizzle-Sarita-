import { LightningElement,api,track } from 'lwc';

export default class EvtParent extends LightningElement {
    @api isActiv = false;
    @track val;
    @track val1 ;
    handleNum(event){
       /* this.isActiv = this.isActiv ?false:true
        this.template.querySelector('c-evt-child').childMethod();*/
        const varVal = event.target.value;
        const nameVal = event.target.name;
        if (nameVal == 'name') 
        {
            this.val = varVal
            
            }
        else {
            
            this.val1 = varVal;
        
        }
    
        
    }
   /* disconnectedCallback(){
        
    }
    handleChange(event){
    console.log('label ',event.target.label);
    console.log('value ',event.target.value)
    }
    handleBlur(){
        console.log('onblur');
        if(this.val == 0){
            this.val = ' ';
        }
        
    }
    handleFocus(){
        console.log('onfocus');
        if(this.val ==' '){
            this.val = 0;
        }
    }*/

    handleClick(event){
        const numSum = parseInt(this.val) + parseInt(this.val1);
        alert(numSum)

    }
    
}