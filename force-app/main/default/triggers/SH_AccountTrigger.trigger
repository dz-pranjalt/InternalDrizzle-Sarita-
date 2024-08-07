trigger SH_AccountTrigger on Account (after insert) {
    set<id> accSetId = new set<id>();
    for(Account acc: Trigger.new){
        if(acc.name!=NULL){
            accSetId.add(acc.Id);
        }
    }
    if(accSetId.size()>0){
        SH_AccountCreateAPI.createAccountMethod(accSetId);
    }
}