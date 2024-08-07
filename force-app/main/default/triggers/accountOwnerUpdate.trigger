trigger accountOwnerUpdate on Account (Before insert) {
    Set<Id> accId = new Set<Id>();
    for(Account acc : trigger.new){
        accId.add(acc.OwnerId);
        
    }
    Map<Id,User> uMap = new Map<Id,User>([SELECT Id,Name FROM User WHERE Id IN:accId]);
    for(Account acc : trigger.new){
        User user = uMap.get(acc.ownerId);
        acc.Sales_Rep__c = user.Name;
    }
    
    
}