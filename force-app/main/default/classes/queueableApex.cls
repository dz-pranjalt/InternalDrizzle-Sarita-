/*
chaning of job allow
we can pass Non-Primitive datatype as params (sObject)
We can monitor quableApex by using system.enqueueJobId.
we can not pass record in batch,we can pass 1 or 2 record at time  in QA.
7075i00001SOOQH - 15 digits
*/
global class queueableApex implements Queueable{
    global void execute(QueueableContext qc){
        Account acc = new Account(Name = 'Queueable',Phone='9876543211');
        insert acc;
    }
}