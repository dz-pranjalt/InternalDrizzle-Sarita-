import { LightningElement } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities'; //import barcode API
export default class BarcodeWebScammerLwc extends LightningElement {

    scannedResult ='';

    connectedCallback(){
        this.loadScanner = getBarcodeScanner(); 
        console.log('this.loadScanner ',this.loadScanner)
    }
    handleClick(event){
        const loadScanner = getBarcodeScanner();
        console.log('loadScanner 13 ',loadScanner.isAvailable());
        if(loadScanner == isAvailable()){//check if device has mobile capabilities
            console.log('if ',loadScanner);
            const scanOptions ={
                barcodeTypes:[loadScanner.barcodeTypes.QR], // barcode types 
                instructionText :'Scan a QR Code',
                successText :'Scan Completed..!'
            };
            
            loadScanner.beginCapture(scanOptions)
            .then((result)=>{
                this.scannedResult = result.value;   // print final result on the screen 
            })
            .catch((error)=>{
                this.showError('error',error);
            })
            .finally(()=>{
                loadScanner.endCapture();
            })
        }
        else{
            console.log('else ',loadScanner);
            this.showError('Error','Device Not Supported..!');
        }
        
    }
   

}