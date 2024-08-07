import { LightningElement } from 'lwc';

export default class QuickCase extends LightningElement {
    origin;
    status;
    subject;
    description;
    origin;
    priority;
    get statusOptions(){
        return [

            {value: 'New', label: 'New'},
            {value: 'Inprogress', label: 'Inprogress'},
            {value: 'Closed', label: 'Closed'},
        ]
    }
    get originOptions(){
        return [

            {value: 'Phone', label: 'Phone'},
            {value: 'Web', label: 'Web'},
            {value: 'Email', label: 'Email'},
        ]
    }
    get priorityOptions(){
        return [

            {value: 'High', label: 'High'},
            {value: 'Low', label: 'Low'},
            {value: 'Medium', label: 'Medium'},
        ]
    }
    handleEvent(event){
        const nameVal = event.target.name;
        const val = event.target.value;
        if(nameVal ==='subject'){
            this.subject = val;
        }
        else if(nameVal ==='description'){
            this.description = val;
        }
    }
}