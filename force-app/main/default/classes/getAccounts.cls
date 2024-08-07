public with sharing class getAccounts {
    public getAccounts() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchKey){
        String Key = '%'+searchKey+'%';
        List<Account> accList =[SELECT Id,Name,Phone FROM Account WHERE Name LIKE : Key LIMIT 10];
        return accList;

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData(){  
        List<Account> accList =[SELECT Id,Name,Phone,Rating,Industry,Type FROM Account WHERE Phone !='' LIMIT 5 ];
        return accList;

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactBaseOnAccounts(String searchKey){
        String Key = '%'+searchKey+'%';
        List<Contact> accList =[SELECT Id,Name,Phone,AccountId FROM Contact WHERE Account.Name LIKE: searchKey LIMIT 10];
        return accList;

    }
}