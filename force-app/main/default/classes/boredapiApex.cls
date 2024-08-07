public class boredapiApex {
    @AuraEnabled
    public static List<myWrapper> getAPiData(){
        String strResponse = '';
        List<myWrapper> wrapperList = new List<myWrapper>();
        List<String > strList = new List<String>();
        Http http = new Http();//(hyper text transper protocol)
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.boredapi.com/api/activity');
        req.setMethod('GET');
        HttpResponse httpResponse = http.send(req);
        if(httpResponse.getStatusCode() == 200){
          //  strResponse = httpResponse.getBody();
            myWrapper mywrapperData = (myWrapper) JSON.deserialize(httpResponse.getBody(), myWrapper.class);
           wrapperList.add(mywrapperData);

        }
        return wrapperList;

    }
      public class mywrapper{

        @AuraEnabled public string activity {get;set;}

        @AuraEnabled public string type {get;set;}

        @AuraEnabled public String participants {get;set;}

        @AuraEnabled public String price {get;set;}

        @AuraEnabled public String link {get;set;}

        @AuraEnabled public String key  {get;set;}

         @AuraEnabled public String accessibility  {get;set;}

    }
}