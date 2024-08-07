public with sharing class getMapmarkerData {
    public getMapmarkerData() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getMapAccpunts(){
        List<Account> accList = new List<Account>();
        try {
            accList = [SELECT Id,Name,Description,ShippingStreet,ShippingCity,ShippingPostalCode,ShippingCountry,ShippingState From Account where ShippingStreet!='' LIMIT 10];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return accList;
    }
}