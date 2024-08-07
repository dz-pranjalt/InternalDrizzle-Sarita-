import { api, LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api message ;
    @api pagenumber;
}