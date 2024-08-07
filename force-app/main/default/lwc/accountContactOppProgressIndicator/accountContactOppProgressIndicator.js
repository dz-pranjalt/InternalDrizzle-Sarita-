import { LightningElement, api } from 'lwc';

export default class AccountContactOppProgressIndicator extends LightningElement {
    @api currentStep = 'Account';
    showAccount = true;
    showContact = false;
    showOpportunity = false;
    @api strpCount = [
        { label: 'Account', value: 'Account' },
        { label: "Contact", value: 'Contact' },
        { label: 'Opportunity', value: 'Opportunity' },
    ]
    handleNext(event) {
        alert('mainNext');
        event.preventDefault();
        this.prepareNextStep(event);
    }
    handlePrevious(event) {
        event.preventDefault();
        this.prepareNextStep(event);
    }
    prepareNextStep(event) {
        this.showAccount = event.detail.showAccount;
        this.showContact = event.detail.showContact;
        this.showOpportunity = event.detail.showOpportunity;
        console, log('acc', this.showAccount)
        if (this.showContact) {
            this.currentStep = 'Contact';
            alert('if con')
        }
        else if (this.showAccount) {
            alert('else con')
            this.currentStep = 'Account';
        }
        else if (this.showOpportunity) {
            this.currentStep = 'Opportunity';
        }
    }

}