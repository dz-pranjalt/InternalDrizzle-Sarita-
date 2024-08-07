//We need to update account numberOfContact field when contact has been created and deleted
trigger countNumberOfContactOnAccount on Contact (after insert,after Update,after Delete) {
    Set<Id> AccSet  = new Set<Id>();
    List<Account> newList = new List<Account>();
    
    if(trigger.isAfter && trigger.isInsert){
        For(Contact con : trigger.new){
            AccSet.add(con.AccountId);
        }
    }
    
    if(trigger.isAfter && (trigger.isDelete || trigger.isUpdate)){
        For(Contact con : trigger.old){
            AccSet.add(con.AccountId);
        }
    }
        //Inner query
    List<Account> accList = [Select Id,(Select Id from Contacts) from Account Where Id IN : AccSet];
    if(accList.size()>0){
        For(Account acc:accList){
            Account accA = new Account();
            accA.Id = acc.Id;
            accA.NumberofLocations__c = acc.Contacts.size();
            newList.add(accA);
        }
    }
    
    
    if(newList.size()>0){
        update newList;
    }
}