import { LightningElement, track, wire } from 'lwc';
import getBeerRecords from '@salesforce/apex/beerPagination2.getBeerRecords';
export default class Pagination2 extends LightningElement {
  
 @track dataList;
 columnsList =[
  {label:'Name',fieldName:'Name'},
  {label:'Alcohol',fieldName:'Alcohol__c'},
  {label:'brewery Name',fieldName:'brewery_Name__c'},
  {label:'Price',fieldName:'Price__c'},
  {label:'Tags',fieldName:'Tags__c'},
 ];

 //Variables required for paginations
 pageSizeOptions = [3,5,10,15,20,25]; //optional
 error;
 records = [];
 totalRecords = 0;
 pageSize ;
 totalPages ;
 pageNumber = 1;
 recordsToDisplay = [];


  connectedCallback(){
    getBeerRecords().then(result=>{
      console.log('Data', result);
      this.records = result;
      this.totalRecords = result.length;
      this.pageSize = this.pageSizeOptions [0];
      this.paginationHelper();
      this.error = undefined;
    }).catch(error=>{
      console.error('Error:', error);
      this.error = error;
      this.dataList = undefined;
    })
  }
    handleRecordsPerPage(event){
    this.pageSize = event.target.value;
      console.log(this.pageSize);
      this.paginationHelper();
    }
    handleRowAction(event){
    const selectedRow = event.target.selectedRow;
    console.log('selectedRow ',selectedRow);
    }
    get bDisableFirst(){
    return this.pageNumber == 1;

    }
    get bDisableLast(){
      return this.pageNumber == this.totalPages;
    }
    firstPage(){
    this.pageNumber = 1;
    this.paginationHelper();
    }
    previousPage(){
    this.pageNumber = this.pageNumber - 1
    this.paginationHelper();
    }
    nextPage(){
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }
    lastPage(){
      this.pageNumber = this.totalPages;
      this.paginationHelper();
    }
    paginationHelper(){
      this.recordsToDisplay = [];
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      if(this.pageNumber <= 1){
        this.pageNumber = 1
      }
      else if(this.pageNumber >= this.totalPages){
        this.pageNumber = this.totalPages;
      }
  
      //Set Record To display on current page
      for(let i = (this.pageNumber -1)*this.pageSize;i<this.pageNumber * this.pageSize ; i++){
        if(i===this.totalRecords){
          break;
        }
        this.recordsToDisplay.push(this.records[i]);
      }
  
    }
}