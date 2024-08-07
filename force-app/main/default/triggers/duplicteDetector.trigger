trigger duplicteDetector on CheckName__c (before insert) {
 Set<String> setName = new Set<String>();
    
    if(trigger.isBefore && trigger.isInsert){ 
        for(CheckName__c con : trigger.new){
            CheckName__c checkUp = trigger.oldMap.get(con.Id);
            setName.add(con.LastName__c);
        }
        if(setName.size()>0){
            //Handler Method call 
            //duplicateDetectHandler.checkDuplicateName(setName);
        }
  
    }
}