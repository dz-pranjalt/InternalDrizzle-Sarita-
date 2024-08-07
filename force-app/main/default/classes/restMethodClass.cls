@RestResource(urlMapping='/ContactApi/*')
global with sharing class restMethodClass {
    
@HttpGet
global static List<Contact> getContact(){
    RestRequest contactReq = RestContext.request;
    String conUrl = contactReq.requestURI;
    Integer conLimit =Integer.valueOf(conUrl.subString(conUrl.lastIndexOf('/')+1));
    List<Contact> conList = [Select Name,Phone from Contact limit :conLimit];
    return conList; 
}
@HttpPost
global static void postContact(String firstName,String LastName,String Phone){
    List<Contact> conList = new List<Contact>();
    Contact con = new Contact();
    con.FirstName = firstName;
    con.LastName = LastName;
    con.Phone = Phone;
    conList.add(con);
    if(conList.size()>0){
        insert conList;
    }
    
    
}
}