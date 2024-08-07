//sql = 20,000,
//by using database.queryLocator we can by pass the sql data upto 50 million
//by using Iterator we can enforce the query limit
//batchClass = millions,billions of record retrive
//database.Batchable = Its a interface which has 3 methods(Start,execute,finish)
//databse.BatchbleContext its a context variable which to return dynamic information i.i jobId
//default batch size = 200,max = 2000 min=1
global class batchClass implements Database.Batchable<sObject> {
    List<Account> listAccSuccess =  new List<Account>();
    List<Account> listAccFailled =  new List<Account>();
    Set<Id> successId = new Set<Id>();
    Set<Id> faillId = new Set<Id>();
    global Database.QueryLocator start(Database.BatchableContext bc){
        String query = ' Select Name,Type,Phone,Rating,Industry From Account';
       // List<Account> = [];
        return Database.getQueryLocator(query);
    }   
    global void execute(Database.BatchableContext bc , List<Account> acc){
        List<Account> updateData = new List<Account>();
        For(Account accL : acc){
            accL.Industry = 'Education';
            accL.Rating = 'Hot';
            updateData.add(accL);
        }
        //Database.Insert(ListRecord,allOrNull) // Partial operation
        //Database.Insert(20,false) //
        //Insert
        Database.SaveResult[] sr = Database.update(acc,false);
        for(Database.SaveResult srF : sr){
            if(srF.isSuccess()){
                successId.add(srf.getId());
                System.debug('Sucess');
            }
            else{
                    faillId.add(srF.getId());
                System.debug('Failed');
                }
            }
    }
    global void finish(Database.BatchableContext bc){
        System.debug('Finish');
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    }
 
}