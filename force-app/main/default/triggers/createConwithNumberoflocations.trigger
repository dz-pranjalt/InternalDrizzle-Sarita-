trigger createConwithNumberoflocations on Account (after insert) {
    List<Contact> conList = new List<Contact>();
    Map<Id,Decimal> intMap = new Map<Id,Decimal>();
    for(Account acc:trigger.new){
        intMap.put(acc.Id, acc.NumberofLocations__c);
    }
    if(intMap.size()>0){
        for(Id accId : intMap.keySet()){
            for(Integer i=0;i<intMap.get(accId);i++){
                Contact con = new Contact();
                con.AccountId = accId;
                con.LastName = 'contact'+i;
                conList.add(con);
            }
        }
    }
    if(conList.size()>0){
        insert conList;
    }

}