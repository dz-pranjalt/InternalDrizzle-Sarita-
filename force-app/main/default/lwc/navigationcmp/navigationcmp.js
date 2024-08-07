import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class Navigationcmp extends NavigationMixin(LightningElement){
    handleClick(){
        let pageReferrence ={
            type :'standard__objectpage',
            attributes :{
                actionName : 'list',
                objectApiName :'Account'
            },
            state :{
                    filterName :'Recent'
            }
        };
        this[NavigationMixin.Navigate](pageReferrence,true);
    }

}