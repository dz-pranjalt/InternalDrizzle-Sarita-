@isTest
public class trailHeadBatchTest {
 @testSetup
    static void setup() {
        List<Account> accounts = new List<Account>();
        List<Contact> contacts = new List<Contact>();
        // insert 10 accounts
        for (Integer i=0;i<10;i++) {
            accounts.add(new Account(name='Account '+i,
                billingcity='New York', billingcountry='USA'));
        }
        insert accounts;
        // find the account just inserted. add contact for each
        for (Account account : [select id from account]) {
            contacts.add(new Contact(firstname='first',
                lastname='last', accountId=account.id));
        }
        insert contacts;
    }
    @isTest static void test() {
        Test.startTest();
        trailHeadBatch uca = new trailHeadBatch();
        Id batchId = Database.executeBatch(uca);
        Test.stopTest();
        // after the testing stops, assert records were updated properly
        System.assertEquals(20, [select count() from contact where MailingCity = 'New York']);
    }
}