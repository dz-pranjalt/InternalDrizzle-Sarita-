@RestResource(urlMapping='/api/Account/*')
global with sharing class techaimRestAPi {
  @HttpGet
    global static Account getMethod(){
        RestRequest req = RestContext.request;
        System.debug('req '+req);
        RestResponse res = RestContext.response;
        System.debug('res '+res);
        String accNumber = req.requestURI.subString(req.requestURI.lastIndexOf('/')+1);
        System.debug('accNumber '+accNumber);
        Account acc = [Select Id,Name,Phone from Account Where AccountNumber =:accNumber];
        return acc;
        
    }
}