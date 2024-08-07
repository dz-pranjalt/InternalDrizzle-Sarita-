trigger multipleOpp on Lead (after insert) {
    Set<Id> setId = new Set<Id>();
    if(Trigger.isAfter && trigger.isInsert){
        for(Lead lfor : trigger.new){
            setId.add(lfor.Id);
        }
        if(setId.size()>0){
            multipleOppController.createOpp(setId);
        }
    }
}