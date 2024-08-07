public with sharing class newsApiClass {
    public newsApiClass() {

    }
    @AuraEnabled
    public static Map<String, Object> retriveNews(){
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2e43c592dbd54656986ccb582ab33c15');
        httpRequest.setMethod('GET');

        Map<String, Object> newsJsonData = new Map<String, Object>();
        String strResponse = null;

        try{
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200){
                strResponse = httpResponse.getBody();
                System.debug('String response '+strResponse.length());
            } else {
                throw new CalloutException(httpResponse.getBody());
            }

        } catch(Exception ex){
            throw ex;
        }

        if(!String.isBlank(strResponse)){
          Integer i ;
          for(i=5;i<strResponse.length();i++){
            system.debug('hi '+i);
          }
            newsJsonData = (Map<String, Object>)JSON.deserializeUntyped(strResponse);
            System.debug('newsJson '+newsJsonData);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        } else {
            return null;
        }
    }
}