import { LightningElement } from 'lwc';

export default class LwcMap extends LightningElement {
    value = 'None';
    isMP = false;
    isAP = false;
    isBP = false;
    isMH = true;
    defaultCheck = false;
    get options() {
        return [
            { label: 'None', value: 'None' },
            { label: 'Maharashtra', value: 'Maharashtra' },
            { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
            { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
            { label: 'Bihar', value: 'Bihar' },
        ];
    }
    connectedCallback() {
        if (this.isMP == false && this.isMH == true) {
            this.defaultCheck = true;
            return this.defaultCheck;
        }
    }
    handleChange(event) {
        this.value = event.detail.value;
        console.log('value ' + this.value);
        if (this.value == 'Maharashtra') {
            this.isMH = true;
            this.isMP = false;
            this.defaultCheck = false
            this.isAP = false;
            ths.isBP = false;
        }
        if (this.value == 'Madhya Pradesh') {
            this.isMP = true;
            this.isMH = false
            this.defaultCheck = false
            this.isAP = false;
            ths.isBP = false;
        }
        if (this.value == 'Andhra Pradesh') {
            this.isAP = true;
            this.isMP = false;
            this.isMH = false
            this.defaultCheck = false
            ths.isBP = false;
        }
        if (this.value == 'Bihar') {
            ths.isBP = true;
            this.isMP = false;
            this.isMH = false
            this.defaultCheck = false
            this.isAP = false;
            
        }

    }


    mapMarkers = [
        {
            location: {
                City: 'Dhule',
                Country: 'India',
                PostalCode: '424002',
                State: 'Maharashtra',
                Street: 'Kunane War',
            },
            value: 'location001',
            title: 'The Landmark Building',
            description:
                'The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties', //escape the apostrophe in the string using &#39;
            icon: 'standard:account',
        },
    ];



    mapMarkersIndore = [
        {
            location: {
                City: 'Indore',
                Country: 'India',
                PostalCode: '452001',
                State: 'MADHYA PRADESH',
                Street: '',
            },
            value: 'location001',
            title: 'The Landmark Building',
            description:
                'The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties', //escape the apostrophe in the string using &#39;
            icon: 'standard:account',
        },
    ];
    handleMarkerSelect() {
    }
    handleIndoreMarkerSelect() {
    }


    mapMarkersAmravati = [
        {
            location: {
                City: 'Amaravati',
                Country: 'India',
                PostalCode: '444601',
                State: 'Andhra Pradesh',
                Street: '',
            },
            value: 'location001',
            title: 'The Landmark Building',
            description:
                'The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties', //escape the apostrophe in the string using &#39;
            icon: 'standard:account',
        },
    ];

    mapMarkersPatna = [
        {
            location: {
                City: 'Patna',
                Country: 'India',
                PostalCode: '800001',
                State: 'Bihar',
                Street: '',
            },
            value: 'location001',
            title: 'The Landmark Building',
            description:
                'The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties', //escape the apostrophe in the string using &#39;
            icon: 'standard:account',
        },
    ];



    selectedMarkerValue = 'location001';
    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.target.selectedMarkerValue;
    }


}