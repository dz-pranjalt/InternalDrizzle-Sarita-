public with sharing class nursuryApex {
    public nursuryApex() {

    }

public static String getApi( String foodName){
  HttpRequest httpRequest = new   HttpRequest();
        httpRequest.setHeader('content-type','text/plain;charset=ISO-8859-1');
        httpRequest.setMethod('GET');
        httpRequest.setTimeout(120000);
        
        
        
        httpRequest.setEndpoint('https://api.spoonacular.com/recipes/guessNutrition?'+
            				'apiKey=ab8e9cf9c6c745389084f0389e8dd3a3'+
            				'&title='+foodName);
        Http http = new Http();
        HttpResponse response = http.send(httpRequest);
        
        system.debug('httpRequest'+httpRequest);
        System.debug('response'+response);
        System.debug('responseBody'+response.getBody());
        System.debug('response'+response.getStatus());
return 'hi';
}
}