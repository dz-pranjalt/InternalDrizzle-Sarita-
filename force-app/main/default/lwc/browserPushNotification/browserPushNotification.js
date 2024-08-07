import { LightningElement, track } from 'lwc';

export default class BrowserPushNotification extends LightningElement {
    @track imgUrl = 'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228__340.jpg';
    imgUrl2 = 'https://wl-brightside.cf.tsp.li/resize/728x/jpg/8e1/a5d/ce9b7d530f8147b7e7f4f2bb4b.jpg';
    @track clicked = false;
    clicked2 = false
    handlesBlure(){
        console.log('blur')
        Notification.requestPermission().then(function(permission){
            if(permission === 'granted'){
                const sampleNotification = new Notification('You can feel the nature!...');
            }
        });
        this.clicked2 = false;
        this.clicked = true;
        
    }
    handleFocus(){
        Notification.requestPermission().then(function(permission){
            if(permission === 'granted'){
                const sampleNotification = new Notification('notificatin show!...');
            }
        });
        this.clicked2 = true;
        this.clicked = false;
    }
}