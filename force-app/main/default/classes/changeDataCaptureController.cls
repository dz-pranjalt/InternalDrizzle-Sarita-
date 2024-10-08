public with sharing class changeDataCaptureController {
    @AuraEnabled
    public static void AssignTask(String recordid){
        try {
            Opportunity opp = [select ownerId from Opportunity where id=:recordid];
            Task tsk = new Task();
            tsk.ownerId = opp.ownerId;
            tsk.WhatId = recordid;
            tsk.Subject = 'Complete Deal Closing Formalities';
            tsk.Status = 'Not Started';
            tsk.Priority = 'High';
            insert tsk;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}