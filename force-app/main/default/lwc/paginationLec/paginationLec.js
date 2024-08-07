import { LightningElement,api,track } from 'lwc';
import getContactList from '@salesforce/apex/paginationAPex.getContactList';
const DELAY = 300;
export default class PaginationLec extends LightningElement {

/*
var recordList; // The List of Complete Records
var pageList; // The record List which needs to be displayed in a page
var currentPage = 1;
// by default will always be 1
var recordPerPage = 10;
 // The no of records needs to be displayed in a single page
var totalPages = 1;   // calculates the total number of pages

CALCULATE NUMBER OF PAGES
this.totalPages = Math.ceil(recordList.length / recordPerPage );

NAVIGATION BUTTONS
handleNext() {
        this.pageNo += 1;
        this.preparePaginationList();
    }

    handlePrevious() {
        this.pageNo -= 1;
        this.preparePaginationList();
    }

    handleFirst() {
        this.pageNo = 1;
        this.preparePaginationList();
    }

    handleLast() {
        this.pageNo = this.totalPages;
        this.preparePaginationList();
    }
*/
value ="5";
options =[
    { "label": "5", "value": "5" },
    { "label": "10", "value": "10" },
    { "label": "15", "value": "15" },
    { "label": "20", "value": "20" },
    
]
   @track selectedVal ;
@track recordEnd = 0;
    @track recordStart = 0;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track loaderSpinner = false;
    @track error = null;
    @track pageSize = 10;    
    @track isPrev = true;
    @track isNext = true;
    @track contacts = [];
    
    connectedCallback() {
        this.getContacts();
    }
    handleChange(event){
        this.pageSize = event.target.value;
        this.pageNumber = 1 
        this.loaderSpinner = true;
        getContactList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loaderSpinner = false;
            if(result){
                var resultData = JSON.parse(result);
                this.recordEnd = resultData.recordEnd;
                this.totalRecords = resultData.totalRecords;
                this.recordStart = resultData.recordStart;
                this.contacts = resultData.contacts;
                this.pageNumber = resultData.pageNumber;                
                this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
            }
        })
        .catch(error => {
            this.loaderSpinner = false;
            this.error = error;
        });
        //this.getContacts();
    }
    
    handlePageNextAction(){
        this.pageNumber = this.pageNumber+1;
        this.getContacts();
    }
 
   
    handlePagePrevAction(){
        this.pageNumber = this.pageNumber-1;
        this.getContacts();
    }
 
    
    getContacts(){
        this.loaderSpinner = true;
        getContactList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loaderSpinner = false;
            if(result){
                var resultData = JSON.parse(result);
                this.recordEnd = resultData.recordEnd;
                this.totalRecords = resultData.totalRecords;
                this.recordStart = resultData.recordStart;
                this.contacts = resultData.contacts;
                this.pageNumber = resultData.pageNumber;                
                this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
            }
        })
        .catch(error => {
            this.loaderSpinner = false;
            this.error = error;
        });
    }
 
   
    get isDisplayNoRecords() {
        var isDisplay = true;
        if(this.contacts){
            if(this.contacts.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }

    
}