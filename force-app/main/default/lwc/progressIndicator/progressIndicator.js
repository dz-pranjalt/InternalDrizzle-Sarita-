import { LightningElement,api } from 'lwc';

export default class ProgressIndicator extends LightningElement {
    @api currentStep = 'Account';
    @api stepValues =[
     {label:"Contact", value:'Contact'},
     {label:'Account',value:'Account'},
     {label:'Opportunity',value:'Opportunity'},
    ]
}