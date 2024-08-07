public class contactListController {
    @AuraEnabled
    public static List<Contact> getContact(List<Id> accId){
        List<Contact> conList = [SELECT Name,Phone,Email,AccountId FROM Contact WHERE AccountId IN:accId];
        return conList;
    }
    @AuraEnabled
    public static Map<String,String> saveContact(List<Contact> conList){
        Map<String,String> resultMap = new Map<String,String>();
        try{
            update conList;
        }
        catch(Exception e){
            resultMap.put('status', 'error');
            resultMap.put('message',e.getMessage());
        }
        return resultMap;
    }
}