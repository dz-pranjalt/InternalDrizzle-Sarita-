import { LightningElement } from 'lwc';
import lightningAlertdemo from 'lightning/alert';
export default class LightningAlert extends LightningElement {
    handlerAlert(event){
        const {name} = event.target
        lightningAlertdemo.open({
            message:"This is my first alert message",
            label:`This is an ${name} alert...`,
            theme:"success"
        })
    }

}