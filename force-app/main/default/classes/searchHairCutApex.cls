public class searchHairCutApex {
    @AuraEnabled(cacheable=true)
    public static List<Hair_Data__c> getData(String hairName){
        String searchKey = '%'+hairName+'%';
        List<Hair_Data__c> hObj = new List<Hair_Data__c>();
        if(hairName !=''){
        hObj = [Select Id,Name,Image_Url__c from Hair_Data__c where Name LIKE:searchKey];
        }
        else{
            hObj = [Select Id,Name,Image_Url__c from Hair_Data__c ];
        }
        return hObj;
    }
    @AuraEnabled(cacheable=true)
    public static List<Hair_Detail_Descriptions__c> getImageData(String hairName){
        List<Hair_Detail_Descriptions__c> hObj = new List<Hair_Detail_Descriptions__c>();
        hObj = [Select Id,Name,ImgUrl__c,Description__c from Hair_Detail_Descriptions__c where Name =: hairName];
        return hObj;
    }
     @AuraEnabled
    public static List<Hair_Cut_Appointment__c> saveData(String hairName,Datetime dt){
        List<Hair_Cut_Appointment__c> hObj = new List<Hair_Cut_Appointment__c>();
        hObj = [Select Id,Name,Booking_Date_Time__c from Hair_Cut_Appointment__c where Name =: hairName];
        return hObj;
    }
       @AuraEnabled(cacheable=true)
    public static List<User> userList() {
        List<User> userList = new List<User>();      
        userList = [Select Id,Name FROM  User];
         return userList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Book_Appointment__c> checkAppointment(DateTime appointmentData){
          List<Book_Appointment__c> appList =  new List<Book_Appointment__c>();
       if(appointmentData != null ){
            appList = [Select Booking_Date__c,Name,OwnerId from Book_Appointment__c where Booking_Date__c =: appointmentData];
            System.debug('appList '+appList);
           if(appList.size()>0){
               System.debug('recordFound ');
               return appList;
           }
           else{
               System.debug('recordNotFound ');
               appList = [Select Booking_Date__c,Name,OwnerId from Book_Appointment__c ];
               return appList;
           }
       }
       return appList;
    }
     @AuraEnabled(cacheable=true)
    public static List<Hair_Cut_Appointment__c> getUsersAppointmentBookData(String userName) {
        date d = System.today();
        System.debug('dateToday '+d );
        List<Hair_Cut_Appointment__c> hairCutUsersData = new List<Hair_Cut_Appointment__c>();      
        hairCutUsersData = [Select Id,Name,Owner.Name,Booking_Date_Time__c FROM  Hair_Cut_Appointment__c where Owner.Name =:userName AND CreatedDate =:d];
         return hairCutUsersData;
    }

}