import { LightningElement, api } from 'lwc';

export default class ExpandableSection extends LightningElement {
    @api label;
    @api id;
    toggleSection(event){
        let btnId = event.currentTarget.dataset.buttonid;
        console.log('btnid ',btnId);
        let currentsection = this.template.querySelector('[data-id="' + btnId + '"]');
        if (currentsection.className.search('slds-is-close') == -1) {
            console.log('if')
            currentsection.className = 'slds-section slds-is-close';
        } else {
            console.log('else')
            currentsection.className = 'slds-section slds-is-open';
        }
    
    }
}