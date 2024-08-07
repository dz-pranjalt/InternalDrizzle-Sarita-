import { LightningElement, api, wire, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import LeadObj from '@salesforce/schema/Lead';


export default class RecordDetailCmp extends LightningElement {

    @track openModal = false;
    @track resonName ;
    @track lastAction;
    @track nextAction;
    @track uniName;
    @track uniId;
    @track schoolDep;
    @track leadCity;
    @track targetVal;
    @track finalVal;
    showModal() {
        this.openModal = true;
    }
    closeModal() {
        this.openModal = false;
    }
 leadStage =[
    {label:'Contact Initiated ',value : 'Contact Initiated'},
    {label:'Not Interested ',value : 'Not Interested'},
    {label:'Demo Done ',value : 'Demo Done'},
    {label:'Custom Proposal Shared ',value : 'Custom Proposal Shared'},
    {label:'Contact Initiated ',value : 'Contact Initiated'},
    {label:'Proposal Rejected ',value : 'Proposal Rejected'},
    {label:'Principle Agreement ',value : 'Principle Agreement'},
    {label:'Agreement Signed ',value : 'Agreement Signed'},
    {label:'First Invoice Sent',value : 'First Invoice Sent'},
    {label:'First Payment Transferred ',value : 'First Payment Transferred'},
    {label:'First Payment Received ',value : 'First Payment Received'},
    {label:'Agreement Shared ',value : 'Agreement Shared'},
    {label:'Contact Found ',value : 'Contact Found'},
 ];
   
 leadStatus =[
    {label:'New',value:'New'},
    {label:'Draft', value:'Draft'}
 ];

 leadTemperature = [
    {label:'Hot',value:'Hot'},
    {label:'Warm',value:'Warm'},
    {label:'Cold',value:'Cold'}
 ] ;

 leadPipeline = [
    {label:'Active',value:'Active'},
    {label:'Not Active', value:'Not Active'},
    {label:'Hold',value:'Hold'},
    {label:'Converted', value:'Converted'},
    {label:'Abondoned', value:'Abondoned'},
 ];

 leadCountry = [
    {label:'Australia',value:'Australia'},
    {label:'Canada',value:'Canada'},
    {label:'France',value:'France'},
    {label:'Ireland',value:'Ireland'},
    {label:'UK',value:'UK'},
    {label:'US',value:'US'},
    {label:'Other',value:'Other'},
 ]
 leadSubOffer =[
    {label:'TBD',value:'TBD'},
    {label:'AR',value:'AR'},
    {label:'FR',value:'FR'},
    {label:'AR+FR',value:'AR+FR'},
    {label:'Marketing',value:'Marketing'},
    {label:'SF Agent',value:'SF Agent'},
 ]

 activeSectionMessage = '';
 isDVisible = false;

 

 get isMessageVisible() {
     return this.activeSectionMessage.length > 0;
 }

 handleStage(event) {
       var stageValue = event.target.value
        console.log('Change Value ', stageValue);
       
    }
    handleReson(event){
       this.resonName = event.target.value;
       console.log('ResonVal ',this.resonName);

    }
    handleLastAction(event){
     this.lastAction = event.target.value;
     console.log('lastAction ',this.lastAction);
    }
    handleNextAction(event){
      this.nextAction = event.target.value;
      console.log('nextAction ',this.nextAction);

    }
    handleUniName(event){
      this.uniName = event.target.value;
      console.log('uniName ',this.uniName);
    }
    handleUniId(event){
   this.uniId = event.target.value;
   console.log('uniId ',this.uniId);
    }
    handleSchoolDep(event){
   this.schoolDep = event.target.name;
   console.log('schoolDep ',this.schoolDep);
    }
    hanledLeadCity(event){
      this.leadCity = event.target.value;
      console.log('leadCity ',this.leadCity);
    }
    handleTargetVal(event){
      this.targetVal = event.target.value;
      console.log('targetVal ',this.targetVal);
    }
    handleFinalVal(event){
      this.finalVal = event.target.value;
      console.log('finalVal ',this.finalVal);
    }
    handleStatus(event){
      var statusVal = event.target.value;
      console.log('statusVal ',statusVal);
    }

    handleTemperature(event){
   console.log('temperature ',event.target.value);
    }
    handleCHange(event){
      var name1 = this.template.querySelectorAll(".inpName");
     console.log('name1 ',name1);
     let childsList = this.getElementsByClassName('resonName')
     console.log('nameatt ',childsList.name);

    }
   
    handlePipeline(event){
      var pipelineValue = event.target.value;
      console.log('pipelineValue ',pipelineValue);
    }
    handleCountry(event){
      var countryVal = event.target.value;
      console.log('countryVal ',countryVal);
    }
    handleSubOffer(event){
      var subOffer = event.target.value;
      console.log('subOffer ',subOffer);
    }
    handleSubOpted(event){
      var subOpted = event.target.value;
      console.log('subOpted ',subOpted);
    }
    handleSave(){

    }
    handleCancel(){

    }


}