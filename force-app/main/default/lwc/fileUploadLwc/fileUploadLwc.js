import { LightningElement, api } from 'lwc';
import saveFiles from '@salesforce/apex/fileUploadLwcApex.saveFiles';
import deleteFile from '@salesforce/apex/fileUploadLwcApex.deleteFile';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class FileUploadLwc extends LightningElement {

@api recordId;
uploadedFiles = [];
handleUploadFinished(event) {
    const uploadedFiles = event.detail.files;
    
    const fileIds = uploadedFiles.map(file => file.documentId);

    saveFiles({ contactId: this.recordId, fileIds })
        .then(() => {
            this.uploadedFiles = this.uploadedFiles.concat(uploadedFiles);
            console.log('uploadeFiles ',this.uploadedFiles);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Files uploaded and attached to Contact.',
                    variant: 'success',
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error uploading files: ' + error.body.message,
                    variant: 'error',
                })
            );
        });
    }
    // handleUploadFinished(event) {
    //     refreshApex(this.wiredUploadedFiles);
    // }

    deleteFile(event) {
        const fileId = event.target.dataset.fileId;
        deleteFile({ fileId })
        .then(() => {
            this.uploadedFiles = this.uploadedFiles.filter(file => file.documentId !== fileId);
            console.log('uploadeFiles ',this.uploadedFiles);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'File deleted successfully.',
                    variant: 'success',
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error deleting file: ' + error.body.message,
                    variant: 'error',
                })
            );
        });
    }
}