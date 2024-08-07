trigger checkEmail on Account (before insert,before update) {
        for(Account acc : trigger.new){
            if(acc.Email__c=='' || acc.Email__c==null){
                acc.Email__c.addError('You can not keep email blank');
            }
            else{
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                String[] toAddress = new String[]{acc.Email__c};
                mail.setToAddresses(toAddress);
                mail.setSubject('Salesforce account has been created');
                mail.setPlainTextBody('Your salesforce account ha been created with '+acc.Name +'Name');
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
                
            }
        }
}