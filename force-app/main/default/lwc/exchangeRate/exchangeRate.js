import { LightningElement,track } from 'lwc';
import getAvailableSymbol from '@salesforce/apex/exchangeController.getAvailableSymbol';
import getAPIData from '@salesforce/apex/exchangeController.getAPIData';
export default class ExchangeRate extends LightningElement {

    @track res=[];

     @track test=[];

     result;
     fromelSelected;
     fromelSelectedText;

     toSelected;
     toSelectedText;
     convertButtnstateDisabled=true;
     inputedAmmount;
     
     connectedCallback(){
        this.handleClick();
     }
     
     handleFromSelected(event) {  
        // alert(event.target.value);
        this.result=null;
        const item = this.test.find(item => item.value === event.target.value);
        this.fromelSelectedText=item.name;

        this.fromelSelected = event.target.value;
        this.checkConvertState();

     }
     handleToSelected(event) {  
        // alert(event.target.value);

        this.result=null;
        
        const item = this.test.find(item => item.value === event.target.value);
        this.toSelectedText=item.name;

        
        this.toSelected=event.target.value;
        this.checkConvertState();
    }
    checkConvertState(){
        this.convertButtnstateDisabled=!  ( (this.fromelSelected) && (this.toSelected) && (this.inputedAmmount) );

    }
    
    handleChange(event){ 
        this.inputedAmmount = event.target.value;
        this.checkConvertState();
    }

    handleConvertClick(){
        getAPIData({fromCountry:this.fromelSelected ,toCountry:this.toSelected,amount:this.inputedAmmount}).then((response)=>{
           
         //  alert(JSON.stringify(response));
        
           if(response!= null) {   
            console.log('Responce 50',JSON.stringify(response));
            const symbols=JSON.parse(response.replace(/\r?\n|\r/g, ''))
//alert(JSON.stringify(symbols));
            this.result=symbols.result;
            }
 
         }).catch((error)=>{
            console.log('Error ',error);
             //alert("convert errorMessage"+error);
         });
        
    }



    handleClick(){

       // alert("handleClick");
        console.log(' ***** sucess  *****');
       
        getAvailableSymbol({}).then((response)=>{
           
           if(response!=null){
            this.processcountryData(response);
           }
           

        }).catch((error)=>{
            console.log('Error ',error.body);
            
        });
       

    }


    processcountryData(response){

        const symbols=JSON.parse(response.replace(/\r?\n|\r/g, '')).symbols;
        const keys = Object.keys(symbols);
        console.log('Keys 88 ',keys);
        for(let i = 0; i <keys.length ; i++){
             const option = {
                label : symbols[keys[i]]+"  ("+keys[i]+")",
                name: symbols[keys[i]],
                value : keys[i]
            };
            this.test = [...this.test, option];

            this.test.sort((a,b)=> (a.name > b.name ? 1 : -1))


          };

     
    }

}