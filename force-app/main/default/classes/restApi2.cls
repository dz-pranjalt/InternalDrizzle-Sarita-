@RestResource(urlMapping='/ContactApi1/*')
global with sharing class restApi2 {
   

    @HttpGet
    global static List<Contact> getContact(){   
    RestRequest conRe = RestContext.request;
    Map<String,String> apiUrl = conRe.params;
    string leadSource = apiUrl.get('leadSource');
    Integer limitcon = Integer.valueOf(apiUrl.get('limit'));
    List<Contact> conList = [SELECT Id,LeadSource,Name from Contact where LeadSource =:leadSource LIMIT:limitcon];
    return conList;

    }
}