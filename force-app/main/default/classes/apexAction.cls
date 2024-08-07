public class apexAction {
@InvocableMethod
    public static List<String> passVal(List<Id> ids){
        List<String> accStr =  new List<String>();
        List<Account> accList = [Select Name from Account where Id =: ids];
        if(accList.size()>0){
            for(Account acc : accList){
                accStr.add(acc.Name);
            }
        }
        return accStr;
    }
    

}