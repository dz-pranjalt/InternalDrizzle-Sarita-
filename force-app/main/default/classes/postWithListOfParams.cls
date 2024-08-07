@RestResource(urlMapping='/ContactAPI3/*')
global with sharing class postWithListOfParams {
    @HttpPost
   global static Contact getCon(){
    RestRequest conResq = RestContext.request;
    String reqBody = conResq.requestBody.toString();
    Contact response = (Contact) JSON.deserialize(reqBody, Contact.class);

    insert response;
    return response;
   }
   @HttpDelete
   global static Map<String,String> getDeleteRecord(){
    Map<String,String> respMap = new Map<String,String>();
    RestRequest reqBody = RestContext.request;
    string param = reqBody.requestURI;
    Id contactId = Id.valueOf(param.substring(param.lastIndexOf('/')+1));
    Contact conId = new Contact(Id = contactId);
    try{
        delete conId;
        respMap.put('success','1');
        respMap.put('message','Record has been deleted successfully');
    }
    catch(exception e){
        respMap.put('Error','0');
        respMap.put('message',e.getMessage());
    }
    return respMap;
   }
}