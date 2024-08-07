public with sharing class signupClass {
    public signupClass() {

    }
    @AuraEnabled
    public static string createSignup(SignUp__c signupList){
        String result = '';
        if(signupList !=null){
            insert signupList;
             result ='success';  
        }
        else {
             result = 'error';
        }
        return result;
    }  
}