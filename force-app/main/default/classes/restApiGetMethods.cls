@RestResource(urlMapping='/GetRestApiCon/*')
global with sharing  class restApiGetMethods {
  
    //Used to insert data into salesforce
   @HttpPost
    global static string getContact(String firstName,String LastName,String Phone){
        List<Contact> conList = new List<Contact>();
        Contact con=new Contact();
        con.FirstName = firstName;
        con.LastName = LastName;
        con.Phone = Phone;
        conList.add(con);
        if(conList.size()>0){
            insert conList;
        }
        return 'hi';
    
    }
    //Its used for Upsert Operation(Insert,Update)
    //sari/ta substring('/') o/p=> ta
    //if id present then data will be update rather than it will be insert
    @HttpPut
    global static Contact putContact(String firstName,String LastName,String Phone,String Email){
        RestRequest req = RestContext.request;
        System.debug(' req37 '+req);
        String url = req.requestURI; 
        System.debug(' url39 '+url);
        String conId =(url.substring(url.lastIndexOf('/')+1)); 
        System.debug('conId '+conId);
        Contact contId = new Contact();
        if(String.isNotBlank(conId)){
            contId.Id = conId;
        }
        contId.FirstName = firstName;
        contId.LastName = LastName;
        contId.Phone = Phone;
        contId.Email = Email;
        
        upsert contId;
        return contId;
        
    }
    //Update Operation
    @HttpPatch
	global static Contact patchContact(){
        RestRequest req = RestContext.request;
        System.debug(' req37 '+req);
        String url = req.requestURI; 
        String conId = url.substring(url.lastIndexOf('/')+1);
        
        //Fetch Request Body
        String reqBody = req.requestBody.toString();
        System.debug('reqBody '+reqBody);
        Contact con;
        if(String.isNotEmpty(conId)){ 
            con = (Contact)JSON.deserialize(reqBody,Contact.class);
            System.debug('con '+con);
            con.Id = conId;
            update con;
        }
        return con;
        
    }
    @HttpDelete
    global static Contact deleteContact(){
        RestRequest req = RestContext.request;
        System.debug(' req37 '+req);
        String url = req.requestURI; 
        String conId = url.substring(url.lastIndexOf('/')+1);
        Contact con = [Select Id From Contact Where Id =:conId];
        delete con;
        return con;
    }
}


  //Used to get data from webservice
   /* @HttpGet
    global static List<Contact> getContact(){
        RestRequest req = RestContext.request;
        System.debug(' req '+req);
        String url = req.requestURI;
        System.debug(' url '+url);
        Integer conLimit =Integer.valueOf(url.substring(url.lastIndexOf('/')+1)); 
        List<Contact> conList = [Select Name,Phone,Email From Contact LIMIT : conLimit];
        return conList;
        
    }*/