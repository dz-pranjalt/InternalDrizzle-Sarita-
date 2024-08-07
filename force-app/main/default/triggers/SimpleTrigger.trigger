trigger SimpleTrigger on Account (before insert,before Update,after Insert) {
    
    //Type of triggers
    //Before-Its used when opertion has been perform on same object
    //After-Its used to perform operation on related record

		//Context(Event) Variable in trigger
		//isBefore
		//isUpdate
		//isAfter
		//isElement
		//isUndelete
		//isInsert
		//new
		//old
		//newMap
		//oldMap
		//size
    List<Account> accList = new List<Account>();
    if(trigger.isBefore &&(trigger.isInsert || trigger.isUpdate)){
        System.debug('1st if');
        For(Account acc:trigger.new){
            accList.add(acc);
            if(acc.Industry == 'Banking'){
                SimpleTriggerHandler.getTrigger(accList);
            }
        }
        
    }
    if(trigger.isAfter && trigger.isInsert){
        For(Account acc:trigger.new){
            accList.add(acc);
            if(acc.Active__c == 'Yes'){
                SimpleTriggerHandler.insertTask(accList);
                
            }
        }
    }
    
}