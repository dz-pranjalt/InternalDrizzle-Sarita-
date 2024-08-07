trigger AccountInsDele on Account (before insert,before delete) {
    
  /*  //List has been defind
    List<String>nameList=new List<String>();
    List<Account> acc1 =  new List<Account>();
    List<Account> newRec = new List<Account>();
    List<account>names=new List<account>();
    
    //To Avoid recursion trigger we used class with a variable
    if(recusTrg.isFirstTime){
        recusTrg.isFirstTime = false;
        for(Account ac:trigger.new){
            nameList.add(ac.name);  
            newRec.add(ac);
        }
        Map<String,Account> accMap = new Map<string,Account>([SELECT Name,Email__c FROM Account WHERE Name IN:nameList ]);
        if(accMap.size()>0){
            names.add(accMap.Values()); 
            acc1.addAll(accMap.Values());
            if(names.size()>0){delete names;}
        }
    } */
}