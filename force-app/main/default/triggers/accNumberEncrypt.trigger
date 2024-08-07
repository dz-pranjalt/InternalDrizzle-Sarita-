trigger accNumberEncrypt on Account (after insert,after update) {
   Set<Id> setId = new Set<Id>();
    if(trigger.isUpdate && trigger.isAfter){
        for(Account acc : trigger.new){
            setId.add(acc.Id);
        }
        if(setId.size()>0){
            System.debug('accList '+setId);
            accountToBigObject.createbigobjData(setId);
        }
    }
  // EncryptAndDecryptHelper.processData(Trigger.new); 

}