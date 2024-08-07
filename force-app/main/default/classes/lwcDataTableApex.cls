public with sharing class lwcDataTableApex {
    public lwcDataTableApex() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(){
        List<Contact> conList = new List<Contact>();
        conList = [SELECT Id,Name,Phone,Title,AccountId,Email,Account.Name from Contact  where Phone !='' AND Title !='' AND AccountId!=''];
        return conList;
    }
}