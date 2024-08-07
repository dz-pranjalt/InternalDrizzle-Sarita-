public with sharing class getOwnerInfor {
    public getOwnerInfor() {

    }
    @AuraEnabled(cacheable=true)
    public static List<User> getKnowledge(String searchVal){
        String Key ='%'+searchVal +'%';
        List<User> userList = [Select Id,Name from User Where Name LIKE : Key];
        return userList;
    }
}