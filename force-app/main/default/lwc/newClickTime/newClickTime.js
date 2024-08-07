import { LightningElement } from 'lwc';

export default class NewClickTime extends LightningElement {

     clickTimestamp;
    handleButtonClick(event) {
        // Store the current timestamp when the button is clicked
        this.clickTimestamp = new Date().getTime();
        console.log('clickTime',this.clickTimestamp)
        // Perform any other logic or actions you need
        // ...
    
        // Optionally, prevent the default behavior of the button
        event.preventDefault();
    }
    connectedCallback(){
        var connTime = new Date().getTime();
        console.log('connTime',connTime)
    }
}