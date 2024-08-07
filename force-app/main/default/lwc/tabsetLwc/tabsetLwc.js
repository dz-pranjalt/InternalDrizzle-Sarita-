import { LightningElement,wire } from 'lwc';
import getAccountData from '@salesforce/apex/getAccounts.getAccountData';
export default class TabsetLwc extends LightningElement {
    showTabFour;
    tabcontent
    acclist;

    @wire(getAccountData)
    wiredData({ error, data }) {
      if (data) {
        console.log('Data 11', data);
        this.acclist = data;
      } else if (error) {
        console.error('Error:', error);
      }
    }
    toggleOptionalTab() {
        this.showTabFour = !this.showTabFour;
    }
    handleActive(event){
     event.preventDefault();
     this.tabcontent = `Tab ${event.target.value} is now active`;
    }
}