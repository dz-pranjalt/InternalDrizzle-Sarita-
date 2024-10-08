/**
 * @description       : 
 * @author            : 
 * @group             : 
 * @last modified on  : 11-17-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class whatsappCloudApiApex {
    public whatsappCloudApiApex() {

    }
    @AuraEnabled
    public static string sendMessage(String messageBody, string phoneNumber,string accessKey, string samplePhone){
        string result= '';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        HttpResponse response= new HttpResponse();

        request.setEndpoint('https://graph.facebook.com/v14.0/'+samplePhone+ '/messages');
        request.setHeader('Content-Type', 'application/json');
        request.setMethod('POST');
        request.setHeader('Authorization', 'Bearer '+ accessKey);
        string body='{"messaging_product":"whatsapp","to":"'+phoneNumber+'","type":"template","template":{"name":"hello_world","language":{"code":"en_US"}}}';
        request.setBody(body);
        response=http.send(request);
        System.debug('response '+response.getBody());
        if(response.getStatusCode() ==200){
            result='Success';
        }
        else{
            result = 'Failed';
        }
        return result;
    }
}