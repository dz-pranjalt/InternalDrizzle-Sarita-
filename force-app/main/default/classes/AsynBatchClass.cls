global class AsynBatchClass implements Database.Batchable<sObject>{
    global Database.QueryLocator start(Database.BatchableContext bc){
        String query = 'Select Id from Account';
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext bc , List<sObject> sList){
        
    }
    global void finish(Database.BatchableContext bc){
        
    }
}