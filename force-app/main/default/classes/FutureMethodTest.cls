@isTest
public class FutureMethodTest {
    //@isTest
    public static testMethod void getTestData(){
        Account acc = new Account();
        acc.Name = 'TestAcc';
        insert acc ;
        
        Set<Id> setId = new Set<Id>();
        setId.add(acc.Id);
        
        Contact con = new Contact();
        con.LastName = 'TestContact';
        con.AccountId = acc.Id;
        insert con;
        
        Test.startTest();
        FutureMethod.futureMethods(setId);
        Test.stopTest();
        
    }

}