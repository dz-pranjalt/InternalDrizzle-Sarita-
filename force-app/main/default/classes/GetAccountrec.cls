public class GetAccountrec {
@AuraEnabled
    public static Accountwrapper getAcc(){
        List<Account> NewAccounts = new  List<Account>();
        List<Account> accList = [SELECT Id, Name, Type, Industry, Rating, SLA__c FROM Account
                                 limit 5];
        if(accList != null && accList.size() > 0){
            for(Account a : accList ){
                    NewAccounts.add(a);
            }  
            Accountwrapper aw = new Accountwrapper();
            aw.NewAccounts = NewAccounts;
            aw.accountcount = accList.size();
            return aw;
        }
        return null;
    }
   
   
    public class Accountwrapper{
        @AuraEnabled
        public List<Account> NewAccounts;
        @AuraEnabled
        public Integer accountcount;
    }
    @AuraEnabled
    public static Contactwrapper getcon(){
        List<Contact> NewContacts = new  List<Contact>();
        List<Contact> conlist = [SELECT Id, Name,LeadSource FROM Contact limit 5];
        if(conlist != null && conlist.size() > 0){
            for(Contact c : conlist ){
                    NewContacts.add(c);
            }
            Contactwrapper cw = new Contactwrapper();
            cw.NewContacts = NewContacts;
            cw.contactcount = conlist.size();
            return cw;
        }
        return null;
       
    }
    public class Contactwrapper{
        @AuraEnabled
        public List<Contact> NewContacts;
        @AuraEnabled
        public Integer contactcount;
       
    }
    @AuraEnabled
    public static Accountwrapper updateAccount(Id AccountId , String rating){
        Account acc = new Account();
        acc.Id = AccountId;
        acc.Rating = rating;
        update acc;
        return getAcc();
       
    }
    @AuraEnabled
    public static Contactwrapper updatecontact(Id ContactId , String LeadSource){
        Contact con = new Contact();
        con.Id = ContactId;
        con.LeadSource = LeadSource;
        update con;
        return getcon();
}
}