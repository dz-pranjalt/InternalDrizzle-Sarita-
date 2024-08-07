import { LightningElement, track, wire } from 'lwc';
import getAccountData from '@salesforce/apex/fetchAccountData.getAccountData';
import serchAccount from '@salesforce/apex/fetchAccountData.serchAccount';
export default class CreateTabale extends LightningElement {
    @track accountData;
    @track error;
    @track searchAcc;
    @track searchList;
    @track msg;

    @wire(getAccountData)
    wiredAcc({ data, error }) {
        if (data) {
            console.log('data ', data);
            this.accountData = data;
            this.error = undefined;
        }
        if (error) {
            console.log('error ', error);
            this.error = error;
            this.accountData = undefined;
        }
    }
    //Imperative Method
    handleChange(event) {
        this.searchAcc = event.target.value;
        console.log('searchAcc ', this.searchAcc);

    }
    
    /*handleClick(){
    serchAccount({ key:this.searchAcc })
    .then(result=>{
        console.log('result 32',result);
        this.searchList = result;
    })
    .catch(error=>{
        console.log('error ',error);
    })
    }

handleClick(){

}*/
    @wire(serchAccount,{key:'$searchAcc'})
    wireSearch({data,error}){
    if(data){
        console.log('29 ',data)
        this.searchList = data;
        console.log('searchList ',this.searchList)
        if(this.searchList ==''){
            console.log('Msg ');
            this.msg = 'Value not present'
        }
    }
    if(error){
        console.log('32 ',data);
    }
    
    }
}