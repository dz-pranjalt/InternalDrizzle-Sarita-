trigger updateAccountDescription on Account (After insert) {
    /*  if(!System.isBatch()){*/
    if(trigger.isInsert && trigger.isAfter){
        for(Account rec:Trigger.new) {
            updateAccountDescriptionApex.fetchPostOfficesByPincode(rec.Postal_Pincode__c,rec.Id);
            
        }
        
    }
}