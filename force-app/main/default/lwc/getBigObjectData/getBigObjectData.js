import { LightningElement, api } from "lwc";

export default class GetBigObjectData extends LightningElement {
    @api objectApiName;
    @api listViewName;
}
