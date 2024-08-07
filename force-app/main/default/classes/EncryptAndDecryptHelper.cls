public class EncryptAndDecryptHelper {
    public static Blob cryptoKey; 
    public static Map<Id,String> encryptKey = new Map<Id,String>(); 
    public static string expMsg; 

    public static void processData(List<Account> accNew){ 

        List<Messaging.SingleEmailMessage> msgList= new List<Messaging.SingleEmailMessage>(); 

        List<Account> accList  = new List<Account>(); 

        Set<Id> recIds = new Set<Id>(); 

        if(trigger.isAfter && trigger.isInsert){ 

            for(Account financeRec : accNew){ 

                if(Account.AccountNumber != null){ 

                    recIds.add(financeRec.Id); 

                } 

            } 

            for(Account financeRec : [SELECT Id,AccountNumber,AccountNumber__c FROM Account WHERE Id IN: recIds]){ 
                financeRec.AccountNumber__c = processEncryption (financeRec.AccountNumber, financeRec.Id); 

                accList.add(financeRec);        

                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage(); 

                email.setToAddresses(new String[]{userInfo.getUserEmail()}); 

                email.setSubject('The Encryption Key'); 

                email.setPlainTextBody('Hi'+' '+userInfo.getName()+','+'\r\n\n'+ 'The key for your record:'+' '+ encryptKey.get(financeRec.Id) + '\r\n'+ 'The record Id is:' + ' '+ financeRec.Id); 

                msgList.add(email); 

            } 

            if(!accList.isEmpty()){ 
                update accList; 
            } 

            if(!msgList.isEmpty()){ 
                messaging.sendEmail(msgList);  

            } 

        }  

    } 
     public static String processEncryption(string name, Id recId){ 

        cryptoKey = Crypto.generateAesKey(128); 

        encryptKey.put(recId, EncodingUtil.base64Encode(cryptoKey)); 

        Blob data = Blob.valueOf(name); 

        Blob encryptedData = Crypto.encryptWithManagedIV('AES128', cryptoKey, data ); 

        string b64Data = EncodingUtil.base64Encode (encryptedData);  
        return b64Data; 

    } 

    public static String processDecryption(string encryptedData, String key){ 
        String decryptedData; 
        Blob data = EncodingUtil.base64Decode (encryptedData); 

        Blob privateKey = EncodingUtil.base64Decode(key);  
        try{ 
        Blob dataToDecrypt = Crypto.decryptWithManagedIV ('AES128', privateKey, data); 
        decryptedData = dataToDecrypt.toString(); 
        } 

        catch(Exception e){ 
           expMsg = e.getMessage();  
        } 
        return (string.isEmpty(expMsg) ?  decryptedData :  null);  

    } 

}