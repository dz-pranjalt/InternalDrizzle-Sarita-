public with sharing class getLeadsData {
    public getLeadsData() {

    }
@AuraEnabled(cacheable=true)
public static List<Lead> getLeads(){
List<Lead> leadList = [Select Name,Phone,Title,Email from Lead Where Phone!=' ' limit 15];
    return leadList;
}
@AuraEnabled
public static string createTask(String subject,Date DateVal , String whoID,String description){
    System.debug('Subject '+subject+' DateVal '+DateVal+' whoID '+whoID+' description '+description);
String userId = UserInfo.getUserId();
List<Task> createTask = new List<Task>();
List<Lead> listleaD = [Select Email,Name,Phone,CreatedDate from Lead where ID=:whoID];
        List<User> u = [select Id,Name,Email From user where Id =: userId];
       List<Lead> updateLead = new List<Lead>();
        if(!String.isBlank(whoID) && whoID !=null ){
            Task t = new Task();
            t.OwnerId = userId;
            t.WhoId=whoID;
            t.Subject = subject;
            t.Description = description;
            t.Status = 'Completed';
            createTask.add(t);
        }

        if(createTask.size()>0 && listleaD.size()>0){
            insert createTask;
            if(listleaD[0].Email !='' && listleaD[0].Email !=null){
                String plainTextBody = ' ';
                plainTextBody += 'Lead Log a Call has been created successfully with the below details :- \n ';
                plainTextBody += ' Name :- '+listleaD[0].Name+' \n';
                plainTextBody += ' Phone :- '+listleaD[0].Phone+' \n';
                plainTextBody += ' Email :-'+listleaD[0].Email+' \n';
                Messaging.SingleEmailMessage singleMsg = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[]{listleaD[0].Email};
                singleMsg.setToAddresses(toAddresses);
                singleMsg.setSubject('Lead log a call has been created successfully');
                singleMsg.setPlainTextBody(plainTextBody);
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { singleMsg });
            }
          
               Lead ldataD = new Lead();
                ldataD.Id = listleaD[0].Id;
                ldataD.Email_Send_Status__c = 'Success';
                ldataD.Log_a_Call_Email_Send_Time__c = listleaD[0].CreatedDate;
                updateLead.add(ldataD);
           
            if(updateLead.size()>0){
                update updateLead;
            }
        } 
    return 'hi';
}

}