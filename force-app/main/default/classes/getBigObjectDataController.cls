/***************************************************************
 * @Auther : Pranjal T
 * Description : Class to show big object record in lightning datatable
 * Created Date : 07-08-2024
 * Last Modify Date : 08-08-2024
 *
 *
 ***************************************************************/

public with sharing class getBigObjectDataController {
    //method to get Bigobject records
    @AuraEnabled(cacheable=true)
    public static List<SObject> getFieldsOfBigobject(String objectApiName) {
        String bigObjectName = createBigObjectName(objectApiName); //create bigobject name

        // get field API names
        List<String> fieldApiNames = getFieldLabelToApiNameMap(bigObjectName);

        // Create the SOQL query
        String soqlQuery = 'SELECT ' + String.join(fieldApiNames, ',') + ' FROM ' + bigObjectName;

        // Execute the query and fetch records
        List<SObject> records = Database.query(soqlQuery);
        return records;
    }

    // Method to get API names of fields in the object
    public static List<String> getFieldLabelToApiNameMap(String objectName) {
        List<String> fieldApiNames = new List<String>();
        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objectName);
        if (sObjectType != null) {
            Map<String, Schema.SObjectField> fieldsMap = sObjectType.getDescribe().fields.getMap();
            for (String fieldName : fieldsMap.keySet()) {
                fieldApiNames.add(fieldName);
            }
        }
        return fieldApiNames;
    }

    // Method to get column names of big object
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getObjectFieldLabels(String objectApiName) {
        String bigObjectName = createBigObjectName(objectApiName);

        List<Map<String, String>> objectFieldInfo = new List<Map<String, String>>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe()
            .get(bigObjectName)
            .getDescribe()
            .fields.getMap();

        for (Schema.SObjectField fieldName : fieldMap.values()) {
            Schema.DescribeFieldResult fieldDescribe = fieldMap.get(String.valueOf(fieldName)).getDescribe();

            // Check if the field is editable
            if (fieldDescribe.isCreateable()) {
                Map<String, String> fieldInfo = new Map<String, String>();
                fieldInfo.put('fieldName', String.valueOf(fieldName));
                fieldInfo.put('type', fieldDescribe.getType().name());
                fieldInfo.put('label', fieldDescribe.getLabel());

                objectFieldInfo.add(fieldInfo);
            }
        }
        return objectFieldInfo;
    }

    //create Bigobject Name
    public static String createBigObjectName(String objectName) {
        String bigObjectName = '';
        if (objectName != null) {
            if (objectName.endsWith('__c')) {
                bigObjectName = objectName.removeEnd('__c') + '__b';
            } else {
                bigObjectName = objectName + '__b';
            }
            return bigObjectName;
        } else {
            return 'Error: Invalid object names';
        }
    }
}
