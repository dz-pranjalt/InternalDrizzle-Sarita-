import { LightningElement, track } from 'lwc';
import retriveNews from '@salesforce/apex/newsApiClass.retriveNews';
export default class NewsApiComponent extends LightningElement {
    @track result;
    @track selectedNews={};
    @track isModalOpen = false;


    get modalClass(){
        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" :""}`
    }
    get modalBackdropClass(){
        return this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop"
    }
    connectedCallback(){
     this.fetchNews();
    }
    fetchNews(){
        retriveNews().then(result=>{
         console.log('result '+result);
         var resp = result.articles;
         this.result = resp.map((item,index)=>{
            let id = `new_${index+1}`;
            let date = new Date(item.publishedAt).toDateString();
            let name = item.source.name;
            return {...item,id:id,name:name,date:date}

         })
        }).catch(error=>{
            console.log('error ',error);
        })
    }
    showModal(event){
        let id = event.target.dataset.item;
        for(let i=4;i<=this.result.length;i++){
        this.result.forEach(item=>{
            if(item.id === id){
                this.selectedNews ={...item}
                console.log('selectedNews ',this.selectedNews)
            }
        })
    }
        this.isModalOpen = true;
    }
    closeModal(){
        this.isModalOpen = false;
    }
}