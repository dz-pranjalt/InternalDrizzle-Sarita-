public class contactRelationHandler {
    public static void insertConRel( List<Contact> conList){
        
        For(Contact con : conList){
            if(con.Contact_Relationship__c == true){
                Contact_Relationship__c cr = new Contact_Relationship__c();
                cr.Contact__c = con.Id;
                cr.Name = con.Name;
                insert cr;
            }
        }
    }
    public static void insertConRel1(Set<Id> setId,List<Contact> conList){
        Map<Id,User> mapUser = new Map<Id,User>([Select Id,Name from User where Id In : setId ]);
        for(Contact con : conList){
            Contact_Relationship__c cr = new Contact_Relationship__c();
            User user = mapUser.get(con.OwnerId);
            cr.Name = user.Name;
        }
    }
}