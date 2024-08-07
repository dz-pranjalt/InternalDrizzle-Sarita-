import { api, LightningElement, track } from 'lwc';

export default class Pagination extends LightningElement {
    currentPage;
    totalPages;
    @api recordsize = 5;
    totalRecords = 0;

    get records(){
        console.log('records ',records);
        return this.visibleRecords;
    }
    @api
    set records(data){
        if(data){
            console.log('pagination data ',data);
            this.totalRecords = data;
            this.recordsize = Number(this.recordsize);
            this.totalPages = math.ceil(data.length/this.recordsize);
            this.updateRecord();
        }    
    }
    get disablePrevious(){
          return this.currentPage <=1;  
    }
    get disableNext(){
        return this.currentPage >=this.totalPages;
    }
    handlePrevious(){
        if(this.currentPage >1){
            this.currentPage = this.currentPage - 1;
            this.updateRecord();
        }    
    }
    handleNext(){
        if(this.currentPage < this.totalPages){
            this.currentPage = this.currentPage + 1;
            this.updateRecord();
        }
    }
    updateRecord(){
        const start = (this.currentPage -1)*this.recordsize;
        const end = this.recordSize*this.currentPage;
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('update',{ 
            detail:{ 
                records:this.visibleRecords
            }
        }))
    }
}