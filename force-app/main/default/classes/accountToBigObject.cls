public class accountToBigObject {
     @future
    public static void createbigobjData(Set<Id> accId){
        List<Account> accList = new List<Account>();
        List<Customer_Interaction__b> custList = new List<Customer_Interaction__b>();
        if(accId.size()>0){
            accList = [Select Id,CreatedDate,AccountNumber,Active__c,AreaNumber__c,Site,NumberOfEmployees,Industry From Account Where Id IN : accId limit 1];
            for(Account acc : accList){
                Customer_Interaction__b cust = new Customer_Interaction__b();
                cust.Account__c = acc.Id;
                cust.Date_Time__c = acc.CreatedDate;
                cust.In_Game_Purchase__c = acc.AccountNumber;
                cust.Level_Achieved__c = acc.Active__c;
                cust.Lives_Used_This_Game__c = acc.AreaNumber__c;
                cust.Game_Platform__c = acc.Site;
                cust.Play_Duration__c = acc.NumberOfEmployees;
                cust.Score_This_Game__c = acc.Industry;
                custList.add(cust);
            }
        }
        if(custList.size()>0){
            System.debug('custList '+custList);
            database.insertImmediate(custList);
        }
 
    }
}