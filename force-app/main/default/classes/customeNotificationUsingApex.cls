public class customeNotificationUsingApex {
    public static void sendNotificatio(){
        Set<String> addressee = new Set<String>();
        
        String  userData = UserInfo.getUserId();
        Account accObj = new Account();
        accObj.Name ='SFDC custome notificatio';
        accObj.OwnerId = userData;
        Insert accObj;
        
        Url hstUrl = System.Url.getOrgDomainUrl();
        String baseUrl = 'https://'+hstUrl+'/';
        
        CustomNotificationType notificationType = [SELECT Id FROM CustomNotificationType WHERE DeveloperName = 'Send_Notification_To_case_user'];
        
        System.debug('owner '+accObj.OwnerId);
        Messaging.CustomNotification notification = new Messaging.CustomNotification();
        notification.setTitle('New Account Created - ' +accObj.Name );
        notification.setNotificationTypeId(notificationType.Id );
        notification.setBody('click here to navigate to the account record. ' +baseUrl+accObj.Id);
        notification.setTargetId(accObj.Id);
        addressee.add(accObj.OwnerId);
        try{
            notification.send(addressee);
        }
        catch (Exception e) {
            System.debug('Problem sending notification: ' + e.getMessage());
        }
    }
}