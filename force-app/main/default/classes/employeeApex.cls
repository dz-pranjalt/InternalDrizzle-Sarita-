public with sharing class employeeApex {
    public employeeApex() {

    }
    
// import Blood_Group_Field from '@salesforce/schema/Employee__c.Blood_Group__c';
// import DOB__Field from '@salesforce/schema/Employee__c.DOB__c';
// import Name__Field from '@salesforce/schema/Employee__c.Name__c';
// import phone_field from '@salesforce/schema/Employee__c.Phone__c';
// import EmailId__field from '@salesforce/schema/Employee__c.EmailId__c'
    @AuraEnabled
    public static string insertEmployee(String address,Date DOB,String phoneName,String emilName){
       
        List<Employee__c> empList = new List<Employee__c>();
        Employee__c emp =  new Employee__c();
        emp.Address__c = address;
         emp.DOB__c = DOB;
         emp.Phone__c = String.valueOf(phoneName);
         emp.EmailId__c = String.valueOf(emilName);
         empList.add(emp);
         if(empList.size()>0){
            insert empList;
         }
        return 'Ok';
    }
}