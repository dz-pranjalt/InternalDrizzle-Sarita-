import { LightningElement } from 'lwc';
import paragraphFirst from '@salesforce/label/c.paragraphFirst';
import paragraphSecond from '@salesforce/label/c.paragraphSecond';
import paragraphThird from '@salesforce/label/c.paragraphThird';
import paragraphFourth from '@salesforce/label/c.paragraphFourth';
import paragraphFifth from '@salesforce/label/c.paragraphFifth';
import paragraphSix from '@salesforce/label/c.paragraphSix';
import paragraphSeven from '@salesforce/label/c.paragraphSeven';
export default class VideoShow extends LightningElement {
    label = {
        paragraphFirst,
        paragraphSecond,
        paragraphThird,
        paragraphFourth,
        paragraphFifth,
        paragraphSix,
        paragraphSeven
    };
}