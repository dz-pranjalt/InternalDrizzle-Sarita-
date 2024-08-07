trigger updateAccount on Account (before insert) {
    if(trigger.isBefore && trigger.isInsert){
        for(Account acc:trigger.new){
            if(acc.Name == 'Test'){
                acc.Phone='9875412356';
            }
        }
    }
}