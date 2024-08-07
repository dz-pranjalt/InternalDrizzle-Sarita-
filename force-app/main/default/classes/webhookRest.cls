@RestResource(urlMapping='/hookin/*')
global class webhookRest {
    @HttpGet
    global static String doGet() {
        return 'I am hooked';
    }
      @HttpPost
    global static string getContact(String firstName,String LastName,String Phone){
        system.debug('firstName '+firstName + ' LastName '+LastName);
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
}