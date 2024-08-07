import { LightningElement, track } from 'lwc';
import Name_Fields from '@salesforce/schema/Account.Name';
import Phone_Field from '@salesforce/schema/Account.Phone';
import insertAccount from '@salesforce/apex/AccountInsert.insertAccount';
export default class InsertAccount extends LightningElement {

    @track accFields = {
        Name: Name_Fields,
        Phone: Phone_Field
    }
    get isValideInput() {
        var valid = true;
        var inputFields = this.template.querySelectorAll(".acc");
        inputFields.forEach(x => {
            if (!x.checkValidity()) {
                x.reportValidity()
                valid = false;
            }
        });
        return valid;
    }
    handleName(event) {
        this.accFields.Name = event.target.value;
    }
    handlePhone(event) {
        this.accFields.Phone = event.target.value;
    }
    handleSubmit(){
        if(this.isValideInput){
            insertAccount({acc : this.accFields})
            .then(result=>{
                console.log('result ',result);
            })
            .catch(error=>{
                console.log('error ',error);
            })
        }
        else{
            console.log('Not Valid ')
        }
    }
}