trigger ActivityCreated on Task (after insert,after delete) {
    Set<Id> activityId = new Set<Id>();
    DateTime activityDate;
    if(trigger.isAfter && trigger.isInsert){
        for(Task t : trigger.new){
            activityId.add(t.WhatId);
            activityDate =t.CreatedDate;
            System.debug('Insert activityDate '+activityDate);
        }
    }
    else if(trigger.isAfter && trigger.isDelete){
        for(Task t : trigger.old){
            activityId.add(t.WhatId);
            System.debug('deleted date '+t.CreatedDate);
            activityDate =t.CreatedDate;
            System.debug('activityDate '+activityDate);
        }
    }
    List<Opportunity> oppList = new List<Opportunity>();
    List<Opportunity> opp = [Select Id,taskCreationDate__c from Opportunity where Id IN: activityId];
    if(opp.size()>0){
        for(Opportunity oppFor : opp){
            System.debug('For '+opp);
            Opportunity opp1 = new Opportunity();
            opp1.Id = oppFor.Id;
            opp1.taskCreationDate__c =activityDate; 
            oppList.add(opp1);
        }
    }
    if(oppList.size()>0){
        System.debug('Update');
        update oppList;
    }
}