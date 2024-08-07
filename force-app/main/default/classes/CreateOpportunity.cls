public class CreateOpportunity {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getConData(String recId){

        List<Contact> conList = [Select Id,Name,FirstName,LastName,Title,Email,Phone,AccountId,Account.Name From Contact where AccountId =: recId];
        System.debug('conList '+conList);
        return conList;
    }
}