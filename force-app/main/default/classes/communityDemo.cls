public with sharing class communityDemo {
    public communityDemo() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Knowledge__kav> getKnowledge(){
        List<Knowledge__kav> knowList =[select Id,Title,Summary,Answer__c,Question__c,UrlName  from Knowledge__kav];
        return knowList;
    }
}