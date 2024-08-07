import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';

export default class PubsubChildTwo extends LightningElement {

    connectedCallback(){
        this.callsubscriber();
    }
    callsubscriber(){
        pubsub.subscribe('sayHello',this.subscriberCallback)
    }
    subscriberCallback(event){
        console.log(event)
    }
}