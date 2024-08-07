public with sharing class getAccData {
    public getAccData() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAcc(){
        List<Account> accList = new List<Account>();
        accList = [Select Name,Phone from Account Where Phone !='' limit 3];
        return accList;
        
    }
}