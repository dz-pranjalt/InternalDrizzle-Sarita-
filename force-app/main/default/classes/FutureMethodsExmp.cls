public with sharing class FutureMethodsExmp {
  @future(callout=true)
    public static void getFutureData(){
        //Basic Integration Part
        Http http = new Http();//(hyper text transper protocol)
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
            
        }
        
            
    }
}