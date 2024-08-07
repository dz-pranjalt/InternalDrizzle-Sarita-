public with sharing class withSharingApex {
    public List<Account> withSharingMethod(){
        return [select id from Account];
    }
    public list<Account> callingWithoutSharingMethod(){
        withoutSharingApex withoutsharing = new withoutSharingApex();
        return withoutsharing.withoutSharingMethod();
    }
}