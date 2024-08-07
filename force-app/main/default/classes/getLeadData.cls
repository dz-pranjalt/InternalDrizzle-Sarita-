public with sharing class getLeadData {
    @AuraEnabled
    public static List<Lead> getLead(){
        List<Lead> lList = [SELECT Name,Phone,Email,CreatedDate FROM Lead where  Phone !=''  and Email !='' Order By CreatedDate DESC LIMIT 10 ];
        return lList;
    }
    @AuraEnabled
    public static String getTask(String description ,String name, String subject,String LeadId){
        System.debug('Params ' +description + ' subject '+subject + 'Name '+name);
        List<Lead> leadList = [Select Id,Name,Email,CreatedDate,Phone From Lead Where Id =: LeadId];
        List<Task> createTask = new List<Task>();
        Lead ldata = new Lead();
         String userId = UserInfo.getUserId();
        List<User> u = [select Id,Name,Email From user where Id =: userId];
        List<Lead> updateLead = new List<Lead>();
        if(!String.isBlank(LeadId) && LeadId !=null ){
            Task t = new Task();
            t.OwnerId = userId;
            t.WhoId=LeadId;
            t.Subject = subject;
            t.Description = description;
            t.Status = 'Completed';
            createTask.add(t);
        }
        if(createTask.size()>0){
            insert createTask;
            if(u[0].Email !='' && u[0].Email !=null){
                String plainTextBody = ' ';
                plainTextBody += 'Lead Log a Call has been created successfully with the below details :- \n ';
                plainTextBody += ' Name :- '+leadList[0].Name+' \n';
                plainTextBody += ' Phone :- '+leadList[0].Phone+' \n';
                plainTextBody += ' Email :-'+leadList[0].Email+' \n';
                Messaging.SingleEmailMessage singleMsg = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[]{u[0].Email};
                singleMsg.setToAddresses(toAddresses);
                singleMsg.setSubject('Lead log a call has been created successfully');
                singleMsg.setPlainTextBody(plainTextBody);
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { singleMsg });
            }
            if(leadList.size()>0){
                ldata.Id = leadList[0].Id;
                ldata.Email_Send_Status__c = 'Success';
                ldata.Log_a_Call_Email_Send_Time__c = leadList[0].CreatedDate; 
                updateLead.add(ldata);
            }
            if(updateLead.size()>0){
                update updateLead;
            }
        }
        return 'hi';
    }
    
}