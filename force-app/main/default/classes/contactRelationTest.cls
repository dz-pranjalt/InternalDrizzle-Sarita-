//@isTestVisible- Used to access apex class private methods
@isTest
public class contactRelationTest {
    @isTest static void getContactData(){
        
        Set<Id> setId = new Set<Id>();
        List<Contact> conList = new List<Contact>();
        
        //Profile data query for user insert operation
        Profile pro = [Select Id from Profile where Name = 'System Administrator'];
        
        //User Data
        User u = new User();
        u.FirstName = 'TestF';
        u.LastName = 'TestL';
        u.ProfileId = pro.Id;
        u.Alias = 'test1234';
        u.Email = 'TestArju324@gmail.com';
        u.TimeZoneSidKey ='Pacific/Kiritimati';
        u.LocaleSidKey ='af_ZA';
        u.EmailEncodingKey = 'UTF-8';
        u.LanguageLocaleKey = 'en_US';
        u.CommunityNickname = 'TestArju324oys';
        u.Username = 'TestArju324@gmail.com';
        insert u;
        
        
        /*To check apex class if condition is true or not
System.assert();
System.assertEquals();
*/
        //Contact Data
        Contact con = new Contact();
        con.LastName = 'TestContact';
        con.Contact_Relationship__c = true;
        con.OwnerId = u.Id;
        conList.add(con);
        insert conList;
        
        setId.add(conList[0].OwnerId);
        
        //Contact update
        conList[0].LastName = 'Test' ;
        update conList;
        
        //Contact relationship data
        Contact_Relationship__c conRel = new Contact_Relationship__c();
        conRel.Contact__c = con.Id;
        conRel.Name = 'testConRel';
        insert conRel;
        
        //Calling apex class with methods
        Test.startTest();
        contactRelationHandler.insertConRel(conList);
        contactRelationHandler.insertConRel1(setId,conList);
        Test.stopTest();
        
    }
}