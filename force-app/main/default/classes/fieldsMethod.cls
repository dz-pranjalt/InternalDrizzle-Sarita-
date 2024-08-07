public class fieldsMethod {
    public static void getFields(){
        List<Account> accList = [SELECT FIELDS(STANDARD),Active__c from Account limit 200];
        //List<Account> accList = [SELECT FIELDS(CUSTOM) from Account limit 200];
       // List<Account> accList = [SELECT FIELDS(ALL),Active__c from Account limit 200];
        System.debug('accList '+accList);
        
    }
}