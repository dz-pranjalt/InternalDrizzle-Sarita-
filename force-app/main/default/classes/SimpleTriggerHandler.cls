public class SimpleTriggerHandler {
    public static void getTrigger(List<Account> accList){
        System.debug('getTrigger');
        for(Account acc: accList){
            System.debug('For Loop');
            if(acc.Rating == 'Hot'){
                System.debug('2nd if');
                acc.Site = 'HotUpdate';
                acc.Type = 'Other';
            }
        }
    }
    public static void insertTask(List<Account> accList){
        System.debug('insertTask');
        List<Task> taskList = new List<Task>();
        for(Account acc:accList){
            Task t = new Task();
            t.Subject = acc.Name;
            t.Description = acc.Website;
            t.WhatId = acc.Id;
            taskList.add(t);
        }
        if(taskList.size()>0){
            insert taskList;
        }
        
    }
}