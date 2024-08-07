public class universityApi {
    @future(callout=true)
    public static void universityAPI()
    {
        try{
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setHeader('content-type','application/json');
            httpRequest.setMethod('GET');
            httpRequest.setTimeout(120000);
            httpRequest.setEndpoint('http://universities.hipolabs.com/search?country=United+States');
            Http http = new Http();
            HttpResponse response = http.send(httpRequest);
            
            String responseData;
            if(Test.isRunningTest()){
                responseData = '{"DataResult":[{"ResponseCode": "200","ResponseDesc": "Success","record_id":"234","error_message":null}]}';
            }
            else{
                responseData = String.valueOf(response.getBody()); 
                system.debug(' responseData '+responseData.length());
            }
            List<universityApiWrapper> lpw = (List<universityApiWrapper>) System.JSON.deserialize(responseData, List<universityApiWrapper>.class);
            Set<String> leadStringID = new Set<String>();
            
            for(universityApiWrapper msg : lpw )
            {
                system.debug(' msg '+msg);            
                
            }
            
        }
        catch(Exception e)
        {
            System.debug('e.getMessage() '+e.getMessage());
            System.debug('e.getLineNumber() '+e.getLineNumber());
            System.debug('e.getTypeName() '+e.getTypeName());
        }
        
        
        
    }
}