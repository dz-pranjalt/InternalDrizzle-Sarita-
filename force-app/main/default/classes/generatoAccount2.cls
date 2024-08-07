public class generatoAccount2 {
    public static void getAcc(){
        
        List<Account> accList = [SELECT Id, Name, Industry From Account];
        
        if(!accList.isEmpty()){
            JSONGenerator gen = JSON.createGenerator(true);
            gen.writeStartObject();     
            gen.writeFieldName('AccountList');
            
            
            gen.writeStartArray();
            for(Account acc :accList){
                gen.writeStartObject();
                gen.writeStringField('Id', acc.Id);
                gen.writeStringField('Name', acc.Name);
                //gen.writeStringField('AccountNumber', acc.AccountNumber);
                //gen.writeStringField('Industry', acc.Industry);
                gen.writeEndObject();
            }
           // gen.writeFieldName('contactList');
            gen.writeEndArray();
            gen.writeEndObject();
          
            String jsonData = gen.getAsString();
            System.debug('jsonData-' + jsonData);
        }
    }
}