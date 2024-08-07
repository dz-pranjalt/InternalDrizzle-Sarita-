import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation'
export default class NaviagtionandToastEvent extends NavigationMixin(LightningElement) {

    handleClick(){
        const event = new ShowToastEvent({
            title: 'Get Help',
            message:'Salesforce documentation is available in the app. Click ? in the upper-right corner.',
            variant :'success'
        });
        this.dispatchEvent(event);
    }
    handleNavigation(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'Home'
            },
        });
    }
}