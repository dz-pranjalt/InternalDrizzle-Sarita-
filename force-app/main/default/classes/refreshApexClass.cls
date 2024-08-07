public with sharing class refreshApexClass {
    public refreshApexClass() {

    }
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountData(){
        List<Account> acc = [Select Id, Name,Phone,Industry from Account Order By CreatedDate Desc Limit 10];
        return acc;
    }
    @AuraEnabled
    public static void updateRecord(String recordId){
        Account accRecord = new Account(Id = recordId);
        accRecord.Industry = 'Education';
        update accRecord;
    }
}