import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
export default class TostandNavigation extends NavigationMixin(LightningElement) {

    handleSobject(){
        this[NavigationMixin.Navigate]({
            type:"standard__objectPage",
            attributes:{
                objectApiName :'Lead',
                actionName:'new'
            },
        });
        const event = new ShowToastEvent({
            title: 'Redirected',
            message:'You have successfully redirected on Lead new page',
            variant :'success'
        });
        this.dispatchEvent(event);
    }
    handleSobjectList(){
        this[NavigationMixin.Navigate]({
            type:"standard__objectPage",
            attributes:{
                objectApiName :'Lead',
                actionName:'list'
            },
            state: {
                filterName :'Recent'
            }
        });
        const event = new ShowToastEvent({
            title: 'Error',
            message:'Error Message',
            variant :'error'
        });
        this.dispatchEvent(event);
    }
    handleSobjectHome(){
        this[NavigationMixin.Navigate]({
            type:"standard__objectPage",
            attributes:{
                objectApiName :'Lead',
                actionName:'home'
            },
        });
        const event = new ShowToastEvent({
            title: 'Warning',
            message:'Warning Message',
            variant :'warning'
        });
        this.dispatchEvent(event);
    }
    handleChatter(){
        this[NavigationMixin.Navigate]({
            type:"standard__namedPage",
            attributes:{
                pageName:'chatter'
            },
        });
        const event = new ShowToastEvent({
            title: 'Info',
            message:'Default Info message',
        });
        this.dispatchEvent(event);
    }
    handleReport(){
        this[NavigationMixin.Navigate]({
            type:"standard__objectPage",
            attributes:{
                objectApiName :'Report',
                actionName:'home'
            },
        });
    }
    handleWeb(){
        this[NavigationMixin.Navigate]({
            type:"standard__webPage",
            attributes:{
                "url" : "https://www.youtube.com/"
            }
        });
    }
    handleCustmTab(){
        this[NavigationMixin.Navigate]({
            type:"standard__navItemPage",
            attributes:{
                apiName :'SignUps'
            }
        });
    }
    handleCustmComponent(){
        this[NavigationMixin.Navigate]({
            type:"standard__component",
            attributes:{
                "componentName" :'c__showPopup'
            }
        });
    }
    handleRecord(){
        this[NavigationMixin.Navigate]({
            type:"standard__recordPage",
            attributes:{
                recordId:'00Q5i000005fB49EAE',
                actionName:'view'
            },
        });
    }
}