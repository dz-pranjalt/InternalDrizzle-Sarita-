public with sharing class googleFormClass {
@AuraEnabled
public static String getFormData(SignUp__c sigList,String email){
    System.debug('signUpList '+sigList);
try{
if(sigList!=null && email!=''){
        insert sigList; 
        String plainTextBody = 'You sucessfully signUp Salesforce Account ';
                plainTextBody += 'Please verify your account on click of the below button:- \n ';
                plainTextBody += 'https://d5i000006kzhjeas-dev-ed.lightning.force.com/';
                Messaging.SingleEmailMessage singleMsg = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[]{email};
                singleMsg.setToAddresses(toAddresses);
                singleMsg.setSubject('Salesforce signUp has been successfully completed');
                singleMsg.setPlainTextBody(plainTextBody);
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { singleMsg });  
}
}catch(Exception e){
System.debug('Exception '+e);
}
return 'hii';
    
}

}