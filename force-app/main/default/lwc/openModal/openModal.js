import { LightningElement, track, wire } from 'lwc';
import getLeads from '@salesforce/apex/getLeadsData.getLeads';
import createTask from '@salesforce/apex/getLeadsData.createTask';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class OpenModal extends NavigationMixin(LightningElement) {
    @track value = 'Not Started';
 @track value1 = 'Email';      
    @track statusVal;
    @track email;
    @track whoID;
    @track Subject;
    @track DueDate;
    @track description;
    get options() {
        return [
            { label: 'Not Started', value: 'Not Started' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Completed', value: 'Completed' }
        ];
    }
get options1() {
        return [
            { label: 'Call', value: 'Call' },
            { label: 'Email', value: 'Email' },
            { label: 'Send Later', value: 'Send Later' },
            { label: 'Send Quote', value: 'Send Quote' }
        ];
    }

    @track customFormModal = false;
    @track apexData;
    @track error;
    @wire(getLeads)
    wireGetLeas({ data, error }) {
        if (data) {

            this.apexData = data;
            this.error = undefined;
            this.email = this.apexData.Email;
            console.log('email ', this.apexData);
        }
        if (error) {
            this.error = error;
        }
    }

    handleSubject(event) {
        this.Subject = event.target.value;
        console.log('Subject ', this.Subject);
    }
    hanledDueDate(event) {
        this.DueDate = event.target.value;
        console.log('Due Date ', this.DueDate);
    }
    hanleddescription(event) {
        this.description = event.target.value;
        console.log('description ', this.description);
    }
    handleStatus(event) {
        this.statusVal = event.target.value;
        console.log('Statucs ', this.statusVal);
    }
    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(xy => {
            if (!xy.checkValidity()) {
                xy.reportValidity();
                isValid = false;
            }

        });
        return isValid;
    }
    customShowModalPopup(event) {
        this.customFormModal = true;
        this.whoID = event.currentTarget.dataset.id;
        console.log('whoID ', this.whoID);
    }
    customHideModalPopup() {
        this.customFormModal = false;
        const event = new ShowToastEvent({
            title: 'Closed Modal',
            message: 'You have closed modal....!',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
    customSaveModalPopup() {
        console.log('Save');
        if (this.isInputValid()) {
            createTask({ subject: this.Subject, DateVal: this.DueDate, whoID: this.whoID, description: this.description })
                .then(result => {
                    console.log('result ', result);
                    const event = new ShowToastEvent({
                        title: 'Email message',
                        message: 'You have successfully Send Email....!',
                        variant: 'success',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(event);

                   /*this[NavigationMixin.Navigate]({
                        type: 'standard__objectPage',
                        attributes: {
                            objectApiName: 'Lead',
                            actionName: 'list'
                        },
                        state: {
                            filterName: 'Recent'
                        }
                    });*/

                    this[NavigationMixin.Navigate]({
                            type: 'standard__recordPage',
                            attributes: {
                                recordId: this.whoID,
                                actionName: 'view',
                            },
                        });
                    
                }).catch (error => {
            console.log('error ', error);
            const event = new ShowToastEvent({
                title: 'Toast message',
                message: 'Fetching error while inserting data' + error.getMessage(),
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
        })
    }
        else {
    const event = new ShowToastEvent({
        title: 'Toast message',
        message: 'Please fill data into required fields',
        variant: 'error',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);

}
    }
}