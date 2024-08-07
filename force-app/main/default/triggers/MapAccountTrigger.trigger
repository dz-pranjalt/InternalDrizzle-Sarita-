trigger MapAccountTrigger on Account (after update) {
    if(trigger.isAfter && trigger.isUpdate){
        MapAccountApex.getAccountList(trigger.new);
    }
}