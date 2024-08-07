public class trailheadFuture {
 @future
    public static void getCountContact(Set<Id> idList){
        Integer numberOfContact = 0;
        
        Set<Id> setId = new Set<Id>();
        if(!idList.isEmpty()){
            For(Id acc : idList){
                setId.add(acc);
            }
        }
        List<Account> accList = [select Id,(Select Id from Contacts) from Account where Id IN : setId];
        for(Account accData : accList){
            numberOfContact = accData.Contacts.size();
        }
    }
}