import { LightningElement,api } from 'lwc';

export default class Lwcaccordion extends LightningElement {
    sections = [
        {
            id: 1,
            label: 'Section 1 in Iteration'
        },
        {
            id: 2,
            label: 'Section 2 in Iteration'
        },
        {
            id: 3,
            label: 'Section 3 in Iteration'
        }
    ]
}