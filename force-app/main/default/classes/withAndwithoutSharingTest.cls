@isTest
public class withAndwithoutSharingTest {
    @isTest(seeAllData = true)
    public static void testMethods(){
        User user = [Select Id,Name from User where UserName = 'gavalesarita@gmail12.com' limit 1];
        System.RunAs(user){
            withSharingApex withsharing = new withSharingApex();
            List<Account> withsharingList = withsharing.withSharingMethod();
            System.debug('withsharingList '+withsharingList.size());
            
            /* List<Account> withsharinwithWtihoutsharinggList = withsharing.callingWithoutSharingMethod();
            System.debug('withsharinwithWtihoutsharinggList '+withsharinwithWtihoutsharinggList.size());
            
            
            withoutSharingApex withoutsharing = new withoutSharingApex();
            List<Account> withoutsharingList = withoutsharing.withoutSharingMethod();
            System.debug('withoutsharingList '+withoutsharingList.size());
            
             List<Account> withoutsharinwithWithsharinggList = withoutsharing.callingWithSharingMethod();
            System.debug('withoutsharinwithWithsharinggList '+withoutsharinwithWithsharinggList.size());
            
            inheritedSharingApex inheritedSharing = new inheritedSharingApex();
            List<Account> accList = inheritedSharing.inheritedSharingMethod();
            System.debug('accList '+accList.size());*/
            
        }
    }
}