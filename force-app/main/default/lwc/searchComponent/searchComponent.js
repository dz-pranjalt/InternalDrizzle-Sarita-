import { LightningElement, track } from 'lwc';

export default class SearchComponent extends LightningElement {

@track searchValue;
    handleSearchValue(event){
        const value = event.target.value;
        this.searchValue = value;

        const evt = new CustomEvent('search',
        {
            detail:this.searchValue
        });
        this.dispatchEvent(evt);
    }
}