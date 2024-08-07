public with sharing class fetchAccountData {
    public fetchAccountData() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData(){
        List<Account> accList = [SELECT Name,Type,Phone FROM Account WHERE Phone !=''];
        return accList;

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> serchAccount(String key){
        String searchKey = '%'+key+'%';
        List<Account> accList = [SELECT Name,Type,Phone FROM Account WHERE Name LIKE:searchKey];
        return accList;

    }
}