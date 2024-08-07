import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigationLwcCmp extends NavigationMixin(LightningElement) {
 @api recordId;

    handleViewAccount(){
     this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:{
                recordId : this.recordId,
                objectApiName :'Account',
                actionName:'view'
            },
     });
    }
    handleNewAccount(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName :'Account',
                actionName:'new'
            },
     });
    }
    handleEditAccount(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:{
                recordId : this.recordId,
                objectApiName :'Account',
                actionName:'edit'
            },
     });
    }
    handleListViewAccount(){
        
     this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes:{
            objectApiName :'Account',
            actionName:'list'
        },
        state:{
            filterName:'Recent'
        },
 });
     
    }
    handleRelatedListAccount(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes:{
                recordId : this.recordId,
                objectApiName :'Account',
             relationshipApiName : 'Contacts',
                actionName:'view'
            },
     });
    }
    handleHomeAccount(){
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes:{
               pageName :'home'
            },
     });
         
    }
    handleContactHome(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
            objectApiName : 'Contact',
            actionName : 'home'
            },
     });
    }
    handleCmp(){
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes:{
            componentName :'c__hello-world'
            },
     });
    }
    handleChatter(){
this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes:{
            pageName:'chatter'
            },
     });
    }
    handleReport(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName :'Report',
                actionName:'home'
            },
        });

    }
    handleFile(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName :'ContentDocument',
                actionName:'home'
            },
        });
    }
    handleWeb(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'https://www.youtube.com/'
            },
        });
    }
    handleCustomeTab(){
        this[NavigationMixin.Navigate]({
            type:'standard__navItemPage',
            attributes:{
                apiName:'Knowledge'
            },
        });
    }
}