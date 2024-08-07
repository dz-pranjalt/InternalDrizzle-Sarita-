public class updateAccountDescriptionApex {
    @future(callout=true)
    public static void fetchPostOfficesByPincode(String pincode,Id accountId) {
        String apiUrl = 'https://lnkd.in/gzapCfCx' + pincode;
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(apiUrl);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        List<String>PostOfficesNameList=new List<String>();
        if(response.getStatusCode() == 200){
            String responseBody = response.getBody();
            
            List<Object> results = (List<Object>)JSON.deserializeUntyped(responseBody);
            Map<String,Object>resultsMap = (Map<String,Object>)results[0];
            
            for(Object PostOffices:(List<Object>)resultsMap.get('PostOffice')){
                Map<String,Object> p = (Map<String,Object>)PostOffices;
                PostOfficesNameList.add((String)p.get('Name'));
                
            }
            String PONamesToBeUpdate = String.join(PostOfficesNameList,',');
            
            //update account
            Account acc = new Account();
            acc.Id = accountId;
            acc.description = PONamesToBeUpdate;
            Update acc;
        }
        else
        {
            System.debug('API request failed with status code: ' + response.getStatusCode());
        }
    }
}