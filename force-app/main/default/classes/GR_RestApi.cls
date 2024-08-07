@RestResource(urlMapping='/RestApiLead/*')
global with sharing class GR_RestApi {
    //Lead Insert From Client Org
    @HttpPost
    global static void doPost(){
        String jsonResponse='';
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        try{
            System.debug('In class:');
            req.addHeader('Content-Type', 'application/json');
            Blob jsonblob = req.requestBody;
            System.debug('jsonblob'+jsonblob);
            string jsonstring = jsonblob.toString(); 
            System.debug('jsonstring'+jsonstring);
            
            List<Lead> leadList = new List<Lead>();
             //ID DrFixitLeadID = Schema.SObjectType.Lead.getRecordTypeInfosByDeveloperName().get('B2B').getRecordTypeId();
            GR_LeadWrapper requestElement= (GR_LeadWrapper)JSON.deserialize(jsonstring,GR_LeadWrapper.class);
            System.debug('Response:'+requestElement);
            list<GR_LeadWrapper.Leads> listofleads = requestElement.Leads;
            for(GR_LeadWrapper.Leads newLead : listofleads){
                Lead createLead = new Lead();
                //createLead.Name = newLead.name;
                createLead.Phone = newLead.phone;
                createLead.Company = newLead.company;
                createLead.Email = newLead.email;
                //createLead.RecordTypeId = newLead.recordType;
                
            }
        }
        catch(exception e){  
            res.statusCode = 400;
            jsonResponse = '{"status": "400", "message": "' + e + '"}';
            res.responseBody = blob.valueOf(jsonResponse);
            return;
        }
    }
}