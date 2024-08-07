public with sharing class lwcApex {
    public lwcApex() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccData(){
        //List<Account> accList = [Select Name,Phone,Email__c From Account where Phone!='' AND Email__c!=''  limit 10 ]; 
        List<Account> accList = [Select Name,Phone,Email__c From Account  limit 10 ];
        return accList;
    }
}