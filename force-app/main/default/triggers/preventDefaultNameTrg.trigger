trigger preventDefaultNameTrg on Account (before insert) {
    Set<String> setStr = new Set<String>();
    if(trigger.isInsert && trigger.isBefore){
        for(Account acc : trigger.new){
            setStr.add(acc.Name);
            Account acc1 = new Account();
            if(acc1.Name == acc.Name){
                acc.Name.addError('You can not create duplicate account');
            }
        }
        }
}

     /*List<Account> accList = [SELECT Name FROM Account WHERE Name IN : setStr];
        if(accList.size()>0){
            for(Account acc : accList){
                acc.Name.addError('You can not create duplicate account');
            }*/