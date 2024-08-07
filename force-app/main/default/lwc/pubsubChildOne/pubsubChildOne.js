import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';

export default class PubsubChildOne extends LightningElement {

    buttonHandler(event){
        this.eventPublisher("Hello from child one");
    }
    eventPublisher(data){
        pubsub.publish("sayHello",data)
    }
}