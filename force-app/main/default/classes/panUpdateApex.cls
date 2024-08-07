public with sharing class panUpdateApex {
    public panUpdateApex() {

    }
   
    @AuraEnabled
    public static String  checkPANStatus(String panNumber ) {
        try {
            Http httpObject = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan');
            request.setMethod('POST');
            request.setHeader('X-RapidAPI-Host', 'pan-card-verification1.p.rapidapi.com');
            //request.setHeader('X-RapidAPI-Key', System.Label.RAPID_API_HOST_KEY);
    
            request.setHeader('Content-Type', 'application/json;charset=UTF-8');

            PANRequest sss= new PANRequest('74f4c926-250c-43ca-9c53-453e87ceacd1','8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',panNumber);

            request.setBody(JSON.serialize(sss));


            HttpResponse response = httpObject.send(request);
            String responseBody = response.getBody();
            system.debug( 'Response body: ' + responseBody);
            return responseBody;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}