import { LightningElement,api,wire } from 'lwc';
import getData from '@salesforce/apex/searchHairCutApex.getData';
import getImageData from '@salesforce/apex/searchHairCutApex.getImageData'; 
import saveData from '@salesforce/apex/searchHairCutApex.saveData';
import userList from '@salesforce/apex/searchHairCutApex.userList'
import getUsersAppointmentBookData from '@salesforce/apex/searchHairCutApex.getUsersAppointmentBookData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class SearchHairCut extends LightningElement {
    @api hairVal;
    @api hairResult;
    @api hairDetailResult;
    @api selectedPic;
    @api selectedDT;
    showImageInfo = false;
    bookAppointment = false;
    @api usersList = [];
    @api appointmentUsersData = [];
    value;
    @api dateSplit;
    @api timeSplit;


    @wire(userList)
    wiredData({ error, data }) {
        if (data) {
            console.log('data ',data)
            for(var i=0;i<data.length;i++){
                console.log('for ',data[i].Name)
                console.log('hairResult 1st ',this.hairResult);
                this.usersList.push({label:data[i].Name,value:data[i].Name});
            }
        } else if (error) {
            console.error('error ',error.body.message);
        }
    }
     @wire(getData,{hairName : ''})
    wiredgetData({ error, data }) {
        if (data) {
            console.log('dataget ',data)
             this.hairResult = data
             console.log('hairResult 2nd ',this.hairResult);
           this.hairVal = ' ';
            for(var i=0;i<data.length;i++){
                console.log('result getdata i ',data[i].Image_Url__c);
            }
        } else if (error) {
            console.error('error ',error.body.message);
        }
    }
    
    handleHairiName(event){
        this.hairVal = event.target.value;

    }
    handleSearch(){
        getData({hairName : this.hairVal})
        .then((result)=>{
            if(result.length > 0 ){
            console.log('result ',result);
            this.hairResult = result;
           this.hairVal = ' ';
            for(var i=0;i<result.length;i++){
                console.log('result i ',result[i].Image_Url__c);
            }
            this.showToast('Success','Record Found','success');
        }
        else{
            this.showToast('Error','No Match Found','error');
        }

        })
        .catch((error)=>{
             console.log('error ',error);
        })
    }
    handleselectedUser(event){
        console.log('selectedUser Id ',event.target.name);
        console.log('selectedUser name ',event.target.value);
        getUsersAppointmentBookData({userName:event.target.value})
        .then((result)=>{
            console.log('result ',result)
            this.appointmentUsersData = result;

            for(var i = 0 ;i<result.length;i++){
                console.log('result[i] : ',result[i].Booking_Date_Time__c);
                var splitDT = result[i].Booking_Date_Time__c.toString();
                var spDT = splitDT.split('T')
                console.log('splitDT ',spDT[0]) ;
                this.dateSplit = spDT[0];
                this.timeSplit = spDT[1]
            }
            
        })
        .catch((error)=>{
            console.log('error ',error.body.message);
        })
    }
    handleFocus(){
    }
    handleAppointment(){
        this.bookAppointment = true;    
    }
    handleAppointmentCancel(){
         this.hairVal = '';
         window.location.reload();
        this.hairDetailResult = ' ';
         this.showImageInfo = false;
         console.log('hairResult cancel ',this.hairResult);
         console.log('hairDetailResult ',this.hairDetailResult);
       
    }
    imgClick(event){
        this.selectedPic = event.currentTarget.dataset.id;
        alert(this.selectedPic)
        getImageData({hairName : this.selectedPic})
        .then((result)=>{
            this.showImageInfo = true;
            this.hairDetailResult = result;

        })
        .catch((error)=>{
            console.log('error ',error.body.message);
        })

    }
    handleDT(event){
        this.selectedDT = event.target.value;
        console.log('selectedDT ',this.selectedDT);
    }
    handleCancel(){
        this.bookAppointment = false;
    }
    handleSave(){
        console.log('selectedPic ',this.selectedPic);
        saveData({hairName : this.selectedPic , dt:this.selectedDT})
        .then((result)=>{
            console.log('result 71 : ',result);
        })
        .catch((error)=>{
            console.log('error : ',error.body.message);
        })
    }
    showToast(title,msg,variant) {
    const event = new ShowToastEvent({
        title: title,
        message: msg,
        variant: variant,
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
}
}