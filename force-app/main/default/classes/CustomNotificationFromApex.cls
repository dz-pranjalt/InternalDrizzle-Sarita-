public with sharing class CustomNotificationFromApex {
    public CustomNotificationFromApex() {

    }
    @AuraEnabled
    public static void notifyUsers(NotificationWrapper wrapp,String bodyStr) {
        // Create a new custom notification
        Messaging.CustomNotification notification = new Messaging.CustomNotification();
        System.debug(' wrapp '+wrapp + 'strbody '+bodyStr);
        notification.setTitle(wrapp.title);
        notification.setBody(bodyStr);

       
        notification.setNotificationTypeId(wrapp.customNotificationType);
        notification.setTargetId(wrapp.targetId);
        
        
        try {
            notification.send(getUserIds());
        }
        catch (Exception e) {
            System.debug('Problem sending notification: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static List<CustomNotificationType> getNotificationList() {
        List<CustomNotificationType> notificationTypeList = new  List<CustomNotificationType>();
        notificationTypeList = [SELECT Id, CustomNotifTypeName, DeveloperName FROM CustomNotificationType ];
        return notificationTypeList;
    }

    public static set<String> getUserIds() {
        set<String> userids = new set<String>();
        for(User usr : [select id from User Where Profile.UserLicense.Name = 'Salesforce' and IsActive = true]){
            userids.add(usr.id);
        }
        return userids;
    }
    public class NotificationWrapper {
        @AuraEnabled public string title{ get; set; }
        @AuraEnabled public string body{ get; set; }
        @AuraEnabled public string customNotificationType{ get; set; }
        @AuraEnabled public string targetId{ get; set; }
    }
}