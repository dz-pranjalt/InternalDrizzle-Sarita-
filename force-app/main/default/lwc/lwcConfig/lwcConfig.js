import { api, LightningElement } from 'lwc';
import label  from '@salesforce/label/c.sample';
import testRes from '@salesforce/resourceUrl/TrailImg';
import lang from '@salesforce/i18n/lang';
import currency from '@salesforce/i18n/currency';
import timezone from '@salesforce/i18n/timeZone';
import userId from '@salesforce/user/Id';
export default class LwcConfig extends LightningElement {
    @api greeting;
    @api headding;

    @api label ={
        label,
        testRes,
        lang,
        currency,
        timezone,
        userId
    };

    get backgroundStyle() {
        return `height:50rem;background-image:url(${testRes})`;
    }
}