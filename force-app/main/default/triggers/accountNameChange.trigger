trigger accountNameChange on Account (before insert) {
    Set<String> setId = new Set<String>();
    if(trigger.isInsert && trigger.isBefore){
    List<Account> accList = new List<Account>();
        for(Account acc : trigger.new){
            System.debug('inFOr '+acc);
            acc.Name = 'Resonant '+acc.Name;
            setId.add(acc.Id);
        }
    }
  
    }