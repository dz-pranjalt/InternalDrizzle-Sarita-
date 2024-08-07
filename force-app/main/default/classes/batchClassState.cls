//Database.Batchable<sObject>,database.statefull,database.Allowscallout(marker interface)
//batch class is by default stateless. If we want to maitaint the variable inside batch class will used Database.statefull.
//when there is an requiremnet to do callout from  batch class at that time we should implement Database.AllowsCallout callout
//Batch X,Batch Y
global class batchClassState implements Database.Batchable<sObject> , Database.Stateful,Database.AllowsCallouts{
    Integer i = 0;
      String query = 'Select Name,statefulle__c from Contact ';
    global Database.QueryLocator start(Database.BatchableContext bc){
        
        return Database.getQueryLocator(query);     
    }
    global void execute(Database.BatchableContext bc ,List<Contact> slist){
        /*for Database,statefulle
         * List<Contact> conList = new List<Contact>();
For(Contact con : slist){
con.stateful__c = i;
i + =1;
conList.add(con);
}
if(conList.size()>0){

Database.update(conList , false);
}		
*/
        
        //For Database.AllowsCallouts
        /*Http http = new Http();//(hyper text transper protocol)
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://sfdcstop.herokuapp.com/blogs');
        req.setMethod('GET');
        
        
        
        //Used to get the response
        HttpResponse resp = http.send(req);
        System.debug('resp status '+resp.getStatus() +'  resp StatusCode '+resp.getStatusCode());//200,400,501
        if(resp.getStatusCode()== 200){
         	System.debug('Body '+resp.getBody());
            sfdcWrapper wrapperClass = sfdcWrapper.parse(resp.getBody());
            for(Integer i = 0 ;i<wrapperClass.blogs.size();i++){
                sfdcWrapper.Blogs blog = wrapperClass.blogs.get(i);
                System.debug(' Blog Id '+blog.id);
                System.debug(' Blog title '+blog.title);
                System.debug(' Blog url '+blog.url);
            }
            
        }*/
    }
    global void finish(Database.BatchableContext bc){
       // FutureMethodsExmp.getFutureData();
    }
}