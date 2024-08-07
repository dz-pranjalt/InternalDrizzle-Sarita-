import { LightningElement,api,track } from 'lwc';
import notifyUsers from '@salesforce/apex/CustomNotificationFromApex.notifyUsers';
import getNotificationList from '@salesforce/apex/CustomNotificationFromApex.getNotificationList';
export default class SendCustomNotification extends LightningElement {

    @api recordId;
    @track notificationOptions = [];
    showNotificationTypePicklist = false; 

    connectedCallback(){
        this.notificationJson.targetId  = this.recordId;
        getNotificationList().then((result)=>{
            console.log('result ',result);
            result.forEach(element => {
                this.notificationOptions.push({
                    label:element.CustomNotifTypeName,value:element.Id });
            });
            console.log('notification options ',this.notificationOptions);
            this.showNotificationTypePicklist = true;
        })
    }
    handleTitle(event){
        this.notificationJson.title = event.target.value;
        console.log('notificationJson title  ',this.notificationJson.title);

    }
    handleBody(event){
        this.notificationJson.boddy = event.target.value;
        console.log('notificationJson boddy  ',this.notificationJson.boddy);

    }
    handleNotificationTypeChange(event){
        this.notificationJson.customNotificationType = event.target.value;
    }
    handleClick(event){
        console.log('notificationJson  ',this.notificationJson);
        notifyUsers({wrapp : this.notificationJson,bodyStr : this.notificationJson.boddy})
        .then(result=>{
            console.log('notifyUserResult ',result);
        })
        .catch(error=>{
            console.log('notifyUserError ',error);
        })
    }
    @track notificationJson = {
        title : null,
        boddy : null,
        customNotificationType : null,
        targetId : null
    };
}