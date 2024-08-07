public with sharing class LwcRefreshApexClass {
    public LwcRefreshApexClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactData(){
       List<Contact> conList = [Select Name,Title,Department,Phone FROM Contact limit 10];
       return conList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> updateDepartment(string recordId){
       List<Contact> conList = [Select Id,Department From Contact Where Id =:recordId];
       conList[0].Department = 'Computer';
       update conList;
       return conList;
    }
    
}