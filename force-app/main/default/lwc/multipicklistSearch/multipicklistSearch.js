import { LightningElement,wire } from 'lwc';
import getLeadData from '@salesforce/apex/createLeadAppointment.getLeadData';
export default class MultipicklistSearch extends LightningElement {

    selected = []; //Selected values
    selectedAll = []; //Selected values array with label and value
    remainingAvailable = []; //
    returnData = [];

    //List of options available for Multi-Select Picklist
    // data = [{ label: 'English', value: 'en' },
    // { label: 'German', value: 'de' },
    // { label: 'Spanish', value: 'es' },
    // { label: 'French', value: 'fr' },
    // { label: 'Italian', value: 'it' },
    // { label: 'Japanese', value: 'ja' },];
   //options = this.data;
   options = [];

    @wire(getLeadData)
    caselist({ error, data }) {
        if(data){
            console.log('data 21 ',data);
            console.log('len 22 ',data.length);
            let pp=[];
            for(let i = 0;i<data.length;i++){
                console.log('i  ',data[i].Name);
                this.returnData.push({
                    label:data[i].Name,
                    value:data[i].Name
                })
                pp.push({
                    label:data[i].Name,
                    value:data[i].Name
                })
                console.log('pp>>>>',pp);
            
            }
            
            this.options=pp;
        }
        if(error){
            console.log('error ',error)
        }
    }
      
    handleAvailableSearch(event){
        let searchValue = event.detail.value;
        if (searchValue) {
           
            let newOptions = this.searchData(this.returnData, searchValue, false);

            //Add selected values in the options
            this.returnData.forEach((element) => {
                if (this.selected.filter(e => e === element.value).length === 1) {
                    newOptions.push(element);
                }
            });
            this.options = newOptions;
        } else {
            //Reset search result
            this.options = this.returnData;
        }
    }
    handleSelectedSearch(event){
        let searchValue = event.detail.value;
        if (searchValue) {
            //Search for data in the Available options
            this.selected = this.searchData(this.selectedAll, searchValue, true);
            let newOptions = [];

            //Maintain selected values array with label and value
            this.returnData.forEach((element) => {
                if (this.selected.filter(e => e === element.value).length === 1) {
                    newOptions.push(element);
                }
            });
            //Add available values in the options
            this.remainingAvailable.forEach((element) => {
                newOptions.push(element);
            });
            this.options = newOptions;
        } else {
            //Reset the selected values
            let selectedValues = [];
            this.selectedAll.forEach((element) => {
                selectedValues.push(element.value);
            });
            this.selected = selectedValues;
            this.options = this.returnData;
        }
    }
    handleChange(event){
        
        this.selected = event.detail.value;
        this.selectedAll = [];

        //Maintain selected values array with label and value
        this.returnData.forEach((element) => {
            this.selected.forEach((selectedValue) => {
                if (element.value === selectedValue && this.selectedAll.filter(e => e.value === selectedValue).length === 0) {
                    this.selectedAll.push(element);
                }
            });
        });

        //Maintain non-selected values array
        this.remainingAvailable = [];
        this.returnData.forEach((element) => {
            if (this.selectedAll.filter(e => e.value === element.value).length === 0) {
                this.remainingAvailable.push(element);
            }
        });
    }
    searchData(allData, searchValue, returnValue) {
        let filterData = [];
        allData.forEach((element) => {
            //Search data
            if (element.label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                if (returnValue) {
                    filterData.push(element.value);
                } else {
                    filterData.push(element);
                }
            }
        });
        return filterData;
    }
}