public without sharing class withoutSharingApex {
    public list<Account> withoutSharingMethod(){
        return [select id from Account];
    }
     public list<Account> callingWithSharingMethod(){
        withSharingApex withsharing = new withSharingApex();
        return withsharing.withSharingMethod();
    }
}