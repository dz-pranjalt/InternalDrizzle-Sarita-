public class MapAccountApex {
    public static void getAccountList(List<Account> accList){
        Map<Id,Account> mapAcc = new Map<Id,Account>();
        if(accList.size()>0){
            for(Account acc : accList){
                mapAcc.put(acc.Id, acc);
            }
        }
        List<Contact> conList = [Select Id,AccountId from Contact Where AccountId =:mapAcc.keySet()];
        System.debug('In conList size '+conList.size());
        if(conList.size()>0){
            for(Contact con : conList){
                Contact ordMap = (Contact)trigger.oldMap.get(con.Id);
                System.debug('In For Loop '+con + ' ordMap '+ordMap);
            
            }
        }
        
    }
}