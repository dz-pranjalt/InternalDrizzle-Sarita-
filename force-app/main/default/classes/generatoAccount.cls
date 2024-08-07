public class generatoAccount {
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
                gen.writeEndObject();
            }
            gen.writeStartObject(); // adding this line
            gen.writeFieldName('ticket');
            gen.writeStartArray();
              for(Account acc :accList){
                gen.writeStartObject();
                gen.writeStringField('Id', acc.Id);
                gen.writeStringField('Name', acc.Name);
                gen.writeEndObject();
            }
            gen.writeEndArray();
            gen.writeEndObject();
             
            String jsonData = gen.getAsString();
            System.debug('jsonData-' + jsonData);
        }
    }
}