@RestResource(urlMapping='/ContactId/*')

global with sharing class deletewithListOdIds {

    global class ResponseWrapper {
        String success;
        String message;
        String error;
    }
    @HttpDelete
    global static List<ResponseWrapper> deleteRec(){
        List<ResponseWrapper> respList = new List<ResponseWrapper>();
        
        RestRequest contactResource = RestContext.request;
        String contactUri = contactResource.requestURI;
        String[] conId = (contactUri.substring(contactUri.lastIndexOf('/')+1)).split(',');
        
        List<Contact> conIdDelete = new List<Contact>();
        for(String con : conId){
            Contact con1 = new Contact(Id=con);
            conIdDelete.add(con1);
        }
        Database.DeleteResult[] sr = Database.delete(conIdDelete , false);
        
        for(Database.DeleteResult dele : sr){
            ResponseWrapper wrap = new ResponseWrapper();
            if(dele.isSuccess()){
                wrap.success ='1';
                wrap.message = 'Record has been deleted succesfully with Id '+dele.getId();
            }
            else {
                for(Database.Error err :dele.getErrors()){
                    system.debug('Error '+err.getMessage());
                    wrap.error = '0';
                    wrap.message = 'Record has not been deleted due to this error =>'+err.getMessage();
                    wrap.message += 'with the status code '+err.getStatusCode();
                }
                
            }
            respList.add(wrap);
        }
        return respList;
    }
}