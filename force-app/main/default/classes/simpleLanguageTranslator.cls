public with sharing class simpleLanguageTranslator {
    public simpleLanguageTranslator() {

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