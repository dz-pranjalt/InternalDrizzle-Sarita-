trigger ownerUpdate on Opportunity (after update) {
    /*
Whenever owner Id change store change owner Id into prior fields and if not change store in the current user field

*/
    String PrioVal;
    List<Opportunity> NewoppList = new List<Opportunity>();
    List<Opportunity> oldoppList = new List<Opportunity>();
    Opportunity oppData = new Opportunity();
    if(trigger.isAfter && trigger.isUpdate){
        if(RecursiveTriggerHandler.isFirstTime){
            RecursiveTriggerHandler.isFirstTime = false;
            for(Opportunity opp:trigger.new){  
                oldoppList.add(opp);
                if(trigger.oldMap.get(opp.ID).OwnerName__c != opp.OwnerName__c ){
                    system.debug('equals ');
                    PrioVal = trigger.oldMap.get(opp.ID).OwnerName__c;
                }
                else{
                    PrioVal = opp.OwnerName__c;
                }
            }
            if(oldoppList.size()>0){
                for(Opportunity opp : oldoppList){
                    oppData.Id = opp.Id;
                    oppData.Current_User__c = opp.OwnerName__c;
                    oppData.Prior_User__c =PrioVal +', '+opp.OwnerName__c;
                    NewoppList.add(oppData);
                }
            }
            
            if(NewoppList.size()>0){
                update NewoppList;
            }
        }
    }
}