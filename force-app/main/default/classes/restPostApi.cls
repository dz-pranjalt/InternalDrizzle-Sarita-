@RestResource(urlMapping='/restpostapi/*')
global with sharing class restPostApi {

    /*@HttpPost
    global static Contact postContact(){
        RestRequest  conReq = RestContext.request;
        String restBody = conReq.requestBody.toString();
        Contact response = (Contact) JSON.deserialize(restBody, Contact.class);
        insert response;
        return response;
    }*/
    @HttpPut
    global static Contact putContact(String firstName,String Lastname,String Email,String Phone){
        RestRequest conReq = RestContext.request;
        String conUri = conReq.requestURI;
        String conId = (conUri.substring(conUri.lastIndexOf('/')+1));
        Contact contId = new Contact();
        if(string.isNotBlank(conId)){
            contId.Id=conId;
        }
        contId.FirstName = firstName;
        contId.LastName = LastName;
        contId.Email = Email;
        contId.Phone = Phone;
        
        upsert contId;
        return contId;

    }
    @HTTPPatch
    global static Contact patchContact(){
        RestRequest conReq = RestContext.request;
        String contUri = conReq.requestUri;
        String conId = contUri.substring(contUri.lastIndexOf('/')+1);

        //To fetch request body where 
        String reqBody = conReq.requestBody.toString();
        Contact contact;
        if(String.isNotEmpty(conId)){
        contact = (Contact)JSON.deserialize(reqBody,Contact.class);
        contact.Id = conId;
        update contact;
 
        }
        return contact;
    }
    @HttpPost
    global static String doPost(String firstName,String Lastname,String Email,String Phone ) {
        Contact acc = new Contact();
        acc.FirstName= firstName;
        acc.LastName=Lastname;
        acc.Email =Email ;
        acc.Phone = Phone;
        insert acc;
        
        return acc.id;
    }
}