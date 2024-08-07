trigger sumCountactPhone on Contact (after update) {
    Set<Id> setId = new Set<Id>();
    if(trigger.isUpdate && trigger.isAfter){
        For(Contact con : trigger.new){
            if(con.AccountId != null){
                setId.add(con.AccountId);
            }
        }
        if(setId.size()>0){
           // sumOfAccountContactPhone.sumPhone(setId);
        }
    }
}