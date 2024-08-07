public class daynamicallyCreateAccount {
 @AuraEnabled(cacheable=true)
    public static List<Account> insertAccount(List<Account> accList){
        system.debug('accList '+accList);
         List<Account> accList1 = [select Id,Name from Account LIMIT 10];
        return accList1;
    }
}