public with sharing class beerPagination2 {
    public beerPagination2() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Beer__c> getBeerRecords(){
       List<Beer__C> beerList = new List<Beer__c>();
       beerList = [Select Name,Alcohol__c,brewery_Name__c,Price__c,Tags__c from Beer__c];
       return beerList;
    }
}