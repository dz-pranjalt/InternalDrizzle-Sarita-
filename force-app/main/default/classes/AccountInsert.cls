public with sharing class AccountInsert {
    public AccountInsert() {

    }
    @AuraEnabled
    public static string insertAccount(Account acc){
        try {
            insert acc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return 'success';
    }
}