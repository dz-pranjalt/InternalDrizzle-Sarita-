@RestResource(urlMapping='/GetRestApi/*')
global with sharing class restGetClass {
   @HttpGet
   global static List<Contact> getContact(){
    RestRequest conReq = RestContext.request;
    String restUri = conReq.requestURI;
    Integer conLimit = Integer.valueOf(restUri.substring(restUri.lastIndexOf('/')+1));

    List<Contact> conList =[Select Name,Phone From Contact LIMIT :conLimit];
    return conList;
   }
}