import { api, LightningElement } from 'lwc';

export default class BeerTile extends LightningElement {

    @api beerRecords;
    handleAddToCart(){

        const addTocart = new CustomEvent(
            'cart',{
                detail :this.beerRecords.Id
            }
        );
        this.dispatchEvent(addTocart);
    }
}