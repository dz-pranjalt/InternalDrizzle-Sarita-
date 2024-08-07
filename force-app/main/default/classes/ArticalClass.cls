public with sharing class ArticalClass {
    public ArticalClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Knowledge__kav> getKnowledge(){
        List<Knowledge__kav> knowList  = new List<Knowledge__kav>();
        //=[select Id,Title,Topic_Name__c,Dislikes__c,Likes__c from Knowledge__kav];
        return knowList;
    }
    @AuraEnabled
    public static string changeLang(String lang) {
        String currentuserId = UserInfo.getUserId();
        User currentUserInfo = [select Id, LanguageLocaleKey from User where Id = :UserInfo.getUserId()];
        currentUserInfo.LanguageLocaleKey = lang;
        update currentUserInfo;
        String response = 'OK';
        return response;
    }
}