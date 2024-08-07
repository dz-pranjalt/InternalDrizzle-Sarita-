import { LightningElement, track } from 'lwc';

export default class BeerSearch extends LightningElement {
  

    @track searchKey;
    handleChange(event){
     const value = event.target.value;
     const evt = new CustomEvent('search',{

        detail : value
     })
     this.dispatchEvent(evt);
    }
}