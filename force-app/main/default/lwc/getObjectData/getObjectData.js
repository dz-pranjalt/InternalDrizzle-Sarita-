import { LightningElement,api,wire,track } from 'lwc';
import getListViewData from '@salesforce/apex/ListViewDataController.getListViewData';
export default class GetObjectData extends LightningElement {
    @api objectApiName;
   

   
    @api listViewName;
    @track data;
    @track error;
    @track columns = [
        { label: 'ID', fieldName: 'Id' },
        { label: 'Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone' },

    ];

    @wire(getListViewData, { objectApiName: '$objectApiName', listViewName: '$listViewName' })
    wiredData({ error, data }) {
        if (data) {
            console.log('data 21 ',data);
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = 'Error fetching data';
            this.data = undefined;
        }
    }
}