import { LightningElement, track, wire } from 'lwc';
import searchBeer from '@salesforce/apex/BeerController.searchBeer';
import getCartId from '@salesforce/apex/BeerController.getCartId';
import 	cartImg from '@salesforce/resourceUrl/cartImg';
import createCartItem from '@salesforce/apex/BeerController.createCartItem';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
export default class BeerList extends NavigationMixin(LightningElement) {
@track beerRecords;
@track error;
cardId ;
@track itemsInCart=0;

@track cartImg = 	cartImg
connectedCallback(){
 this.defaultCardId();
}
defaultCardId(){
    getCartId().then(result=>{
        const wrapper = JSON.parse(result);
        if(wrapper){
            this.itemsInCart = wrapper.Count;
            this.cardId = wrapper.CartId;
        }
    }).catch(error=>{
        this.cardId = undefined;
        console.log('error ',error)
    })

}

addToCart(event){
    const selectedBeerId = event.detail;
    
    console.log('selectedBeerId ',selectedBeerId);
    const selectedBeerRecord= this.beerRecords.find(x=>x.Id === selectedBeerId);
    createCartItem({
        cartId:this.cardId,
        BeerId:selectedBeerId,
        Amount:selectedBeerRecord.Price__c

    }).then(result=>{
        console.log('cart Item Id ',result);
        this.itemsInCart = this.itemsInCart + 1;
        const toast = new ShowToastEvent({
            'title':'Success',
            'message':selectedBeerRecord.Name + ' Added to the cart...!',
            'variant' :'success'
        });
        this.dispatchEvent(toast);

    }).catch(error=>{
        console.log('error ',error);

        const toast = new ShowToastEvent({
            'title':'Error',
            'message':JSON.stringify(error),
            'variant' :'error'
        });
        this.dispatchEvent(toast);

    })
}
navigateToAddTocart(){

    this[NavigationMixin.Navigate]({
        type:'standard__navItemPage',
        attributes:{
            apiName:'Cart_Detail'
        },
        state:{
            c__cardId:this.cardId
        }
    });
}
@wire(searchBeer)
wiredData({ error, data }) {
if (data) {
console.log('Data', data);
this.beerRecords = data;
} else if (error) {
console.error('Error:', error);
this.error = error;
}
}
handleEvent(event){
    const eventVal = event.detail;
    console.log('evetVal ',eventVal)
    searchBeer({searchParams:eventVal})
        .then(result=>{
                console.log('result ',result)
                this.beerRecords = result;
        }).catch(error=>{
            console.log('error ',error);
            this.error = error
        })

}

}