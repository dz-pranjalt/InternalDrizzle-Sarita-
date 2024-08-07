//Async Future Methods
/*When to used future method
1)It will be execute in background whenever its get resource available,job which will be long 
runnig at that time will used future method*/
/*disadvantage of future 
1)Its not support sObject as a parameter
2)channing of job its not available-(we can not call future method in other future method)
3)we can  not monitor future methods
4)return type will be void always(future method did not return anything),bcoz it will execute in future
5)in a transaction we can write 50 future methods.
6)we can execute upto 100 callout in a single transaction.
*/
//Batch class
public class FutureMethod{
    @future(callout=true)
    public static void futureMethods(Set<Id> setId){ 
        List<Account> accList1 = new List<Account>();
        List<Account> listAcc = [Select Id,(Select Id From Contacts) From Account Where Id IN: setId];
        System.debug('listAcc '+listAcc);
        for(Account acc : listAcc){
            List<Contact> conList = acc.contacts;
            acc.NumberOfContact__c = conList.size();
            acc.Id = acc.Id;
            accList1.add(acc);
        }
        if(accList1.size()>0){
        update accList1;
            
        }
        
    }
}