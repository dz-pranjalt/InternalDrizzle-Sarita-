import { LightningElement,api,wire } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/FileController.getRelatedFilesByRecordId'
import {NavigationMixin} from 'lightning/navigation'

export default class FilePreviewanddownload extends LightningElement {

    @api recordId;
    filesList =[];
    @wire(getRelatedFilesByRecordId, {recordId :'$recordId'})
    wiredResult({data, error}){ 
        if(data){ 
            console.log('data ',data[item])
            this.filesList = Object.keys(data).map(item=>({"label":data[item], "value": item, "url":'/sfc/servlet.shepherd/document/download/'+ item }))
        }
        if(error){ 
            console.log(error);
        }
    }
    previewHandler(event){
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
    }
}