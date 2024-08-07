global class scheduleClass implements Schedulable{
    global void execute(SchedulableContext sc){
        batchClass b = new batchClass();
        Id jobId = Database.executeBatch(b);
    }

}