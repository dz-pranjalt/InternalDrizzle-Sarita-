public with sharing class recordDetailApex {
    public recordDetailApex() {

    }
    @AuraEnabled
    public static string createData(String resonName,String lastAction,String nextAction,String uniName,
    String uniId,String schoolDep,String leadCity,String targetVal,String finalVal){
        String result = 'error';

        List<Lead> leadList = new List<Lead>();
        Lead l = new Lead();

        // l.GR_Reason_Not_Interested__c = resonName;
        // l.GR_Last_Action__c = lastAction;
        // l.GR_Next_Action__c = nextAction;
        // l.Company = uniName;
        // l.GR_University_ID__c = uniId;
        // l.GR_School_Department__c = schoolDep;
        // l.GR_City__c = leadCity;
        // l.GR_Target_Amount__c = targetVal;
        // l.GR_Final_Amount__c = finalVal;
        // leadList.add(l);

        if(leadList.size()>0){

             result = 'success';
        }

      
      return result;
    }
}