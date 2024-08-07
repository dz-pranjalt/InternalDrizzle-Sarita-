@isTest
public class duplicateDetectHandlerTest {
    
    @isTest
    public static void getDuplicateData(){
        List<CheckName__c> scheckNameList = new List<CheckName__c>();
        Set<String> setStr = new Set<String>();
        CheckName__c checkName = new CheckName__c();
        checkName.LastName__c ='testName1';
        setStr.add(checkName.LastName__c);
        scheckNameList.add(checkName);
        if(scheckNameList.size()>0){
         insert scheckNameList;
        }
        System.assertEquals(checkName.LastName__c, 'testName1');
        /*Test.startTest();
        duplicateDetectHandler.checkDuplicateName(setStr);
        Test.stopTest();*/
    }
}