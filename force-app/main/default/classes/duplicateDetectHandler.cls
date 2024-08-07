public class duplicateDetectHandler {
    public static void checkDuplicateName(Set<String> setName){
        System.debug('Setname '+setName);
        if(setName.size()>0){
            System.debug('Setname Size '+setName.size());
            List<CheckName__c> conList = [Select Id,LastName__c from CheckName__c where LastName__c IN:setName];
            System.debug('conList '+conList);
            if(conList.size()>0){
                for(CheckName__c con : conList)
                    con.LastName__c.addError('checkName Last Name Should not be an duplicate please enter the new last name....!');
            }
        }
    }
}