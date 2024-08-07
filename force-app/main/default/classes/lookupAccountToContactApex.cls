public with sharing class lookupAccountToContactApex {
    public lookupAccountToContactApex() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(String accName){ 
    String key = '%'+accName+'%';
    List<Account> accList = [select Name,Id from Account Where Name LIKE :key];
    Set<Id> setId = new Set<Id>();
    if(accList.size()>0){
    for(Account acc : accList){
        setId.add(acc.Id);
    }
}
    List<Contact> conList = [Select Name,Phone,Email,AccountId From Contact Where AccountId IN : setId];
    List<Contact> conList1 = new List<Contact>();
    if(conList.size()>0){
        for(Contact con : conList){
            conList1.add(con);
        }
    }
    return conList1;
}
}