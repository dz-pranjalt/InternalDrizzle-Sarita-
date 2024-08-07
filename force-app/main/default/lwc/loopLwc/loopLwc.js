import { LightningElement,track } from 'lwc';

export default class LoopLwc extends LightningElement {

    //Static List in Lwc
    contacts =[
        {Name:'Test',Phone:'987654212',Company:'IT'},
        {Name:'Test2',Phone:'9856784321',Company:'E&TC'},
        {Name:'Test3',Phone:'9745673214',Company:'Mechanical'},
    ];

@track name = 'Sarita';

   // LWC Life Cycle
     constructor(){
        super();
        console.log('Inside COnstructore');
        this.name = 'Gavale'; 
     };
     connectedCallback(){
        console.log('connectedCallback');
        
     }
     disconnectedCallback(){
        console.log('disconnectCallback');
     }
     renderCallback(){
        alert('Hi')
        console.log('renderCallabck');
     }
     errorCallback( error,stack){
        alert('Error')
        console.log('Error ',error);
     }
}