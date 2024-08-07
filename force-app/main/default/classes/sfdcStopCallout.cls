public with sharing class sfdcStopCallout {
        public static void getBlogsMethod(){
           //Used to create a request
            Http http = new Http();
    
            //Used to send Request
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://sfdcstop.herokuapp.com/blogs');
            req.setMethod('GET');
    
            //Used to get the response of request
            HttpResponse resp =http.send(req);
            if(resp.getStatusCode() == 200){
                sfdcJson wrapper = sfdcJson.parse(resp.getBody());
                System.debug('Author Name '+wrapper);
                if((wrapper.blogs !=null)&&(!wrapper.blogs.isEMpty())){
                    for(Integer i=0;i<wrapper.blogs.size();i++){
                        sfdcJson.Blogs blog =wrapper.blogs.get(i);
                        System.debug('Blog Id '+blog.Id);
                        System.debug('Blog title '+blog.title);
                        System.debug('Blog Url '+blog.url);
                    }
                }
            }
        }
    }