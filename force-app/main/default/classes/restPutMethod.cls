@RestResource(urlMapping='/contactPut/*')
global with sharing class restPutMethod {
    @HttpPut
    global static Contact upsertContact(String firstName,String LastName,String Phone){
        RestRequest conReq = RestContext.request;
        system.debug('Request '+conReq);
        string params = conReq.requestURI;
        String contId = params.substring(params.lastIndexOf('/')+1);
        Contact con = new Contact();
        if(String.isNotBlank(contId)){
            con.Id=contId;
        }
        con.FirstName = firstName;
        con.LastName = LastName;
        con.Phone = Phone;


        upsert con;
        return con;
    }
}