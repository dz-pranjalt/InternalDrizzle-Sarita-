public class sumOfAccountContactPhone {
    public static void sumPhone(Set<id> conId){
        // Integer phone = [];
        String phoneDig;
        Integer phoneInt = 0 ;
        List<Account> conList = [Select ID,(Select Id,Phone From Contacts) From Account Where ID IN : conId];
        
        for(Account acc :conList ){
            System.debug('acc '+acc.Contacts);
            for(Contact con : acc.Contacts){
                System.debug('con '+con);
                if(con.Phone !='' && con.Phone !=null){
                    for(Integer i=0;i<Integer.valueOf(con.Phone);i++){
                        system.debug('phoneInt '+i );
                        
                        
                    }
                    // phoneInt = Integer.valueOf(con.Phone);
                    // System.debug('phoneInt 12 '+phoneInt);
                }
                
            }
        }     
    }
    
}