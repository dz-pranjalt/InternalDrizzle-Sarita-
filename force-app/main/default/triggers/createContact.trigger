trigger createContact on Account (after insert) {
    List<Account> accList = new List<Account>();
    List<Contact> conList = new List<Contact>();
    Map<Id,Decimal> mapInt = new Map<Id,Decimal>();
    String userId = UserInfo.getUserId();
    For(Account acc : Trigger.new){
        mapInt.put(acc.Id,acc.NumberOfContact__c); 
        accList.add(acc);
    }
    if(mapInt.size() > 0){
       
        For(Id accId:mapInt.keySet()){ //key return
             system.debug('keySet '+mapInt.get(accId));//will return value of keySet
            for(Integer i=0 ; i<mapInt.get(accId);i++){
                Contact con = new Contact();
                con.AccountId = accId;// Its used to create related contatc of account
                con.LastName ='Contacts '+i;
                con.Email = accList[0].Email__c;
                con.Phone = accList[0].Phone;
                con.Title = 'Account related Contact';
                conList.add(con);
            }
        }
        
    }
    if(conList.size()>0){
        if(accList.size()>0 && accList[0].Email__c !=''){
            //Its used to send message using apex class
            insert conList;
            
            //To Send Email
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            String[] toAddress = new String[]{accList[0].Email__c};
                String[] ccAddress = new String[]{'gavalesarita@gmail.com'};
                    String[] bccAddress = new String[]{'arjunturke86@gmail.com'};
                        String plainTextBody = accList[0].Name+' Your Account Has been create successfully with the mobile number '+accList[0].Phone;
            email.setCcAddresses(ccAddress);
            email.setToAddresses(toAddress);
            email.setBccAddresses(bccAddress);
            email.setPlainTextBody(plainTextBody);
            email.setSubject('Salesforce Account Created');
            email.setHtmlBody('Please visit the link <a href=>https://www.google.com></a>');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
        }
        else{
            accList[0].Email__c.addError('Enter the Email');
        }
    }
}