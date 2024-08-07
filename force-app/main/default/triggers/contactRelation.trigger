trigger contactRelation on Contact (after insert,before update) {
    List<Contact> conList = new List<Contact>();
    if(trigger.isAfter && trigger.isInsert){
        for(Contact con : trigger.new){
            conList.add(con);
        }
        if(conList.size()>0){
            contactRelationHandler.insertConRel(conList);
        }
    }
    else if(trigger.isBefore && trigger.isUpdate){
        Set<Id> uId = new Set<Id>();
        For(Contact con : trigger.new){
            uId.add(con.OwnerId);
            conList.add(con);
        }
        if(conList.size()>0 && uId.size()>0){
            contactRelationHandler.insertConRel1(uId , conList);
        }
       
    }
}