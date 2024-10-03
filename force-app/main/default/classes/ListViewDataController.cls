public without sharing class ListViewDataController {
    private final static String REQUEST_BODY = 'grant_type=password&client_id={0}&client_secret={1}&username={2}&password={3}';
    @AuraEnabled(cacheable=true)
    public static List<SObject> getListViewData(String objectApiName, String listViewName) {
        // Step 1: Get the ListView ID based on the object API name and ListView name
        ListView listViewId = [
            SELECT Id, Name, SObjectType
            FROM ListView
            WHERE SObjectType = :objectApiName AND Name = :listViewName
            LIMIT 1
        ];

        // Step 2: Call the ListView API to get the field API names
        HttpRequest req = new HttpRequest();
        req.setEndpoint(
            URL.getOrgDomainUrl().toExternalForm() + '/services/data/v61.0/ui-api/list-info/' + listViewId.Id
        );
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader(
            'Authorization',
            'Bearer ' +
            '00D5j00000Dq9wL!AQwAQKXWlP0q9pGo1JPSOkKN1dpp0LHHCXv4UGfwhjDxvY1npI2534jnEbhStLHkgdBHI2Dq2TEKvcyqcfNsJCHUQH3dTd1k'
        );
        //req.setHeader('Authorization', 'Bearer ' + accessToken);
        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() != 200) {
            throw new CalloutException('Failed to get list view data: ' + res.getBody());
        }

        // Step 3: Parse the JSON response to get field API names
        Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        List<Object> displayColumns = (List<Object>) jsonResponse.get('displayColumns');
        List<String> fieldApiNames = new List<String>();
        for (Object columnObj : displayColumns) {
            Map<String, Object> column = (Map<String, Object>) columnObj;
            fieldApiNames.add((String) column.get('fieldApiName'));
        }

        // Step 4: Construct the SOQL query using the field API names
        String soqlQuery = 'SELECT ' + String.join(fieldApiNames, ',') + ' FROM ' + objectApiName;

        // Step 5: Execute the query and return the results
        List<SObject> records = Database.query(soqlQuery);
        return records;
    }

     /*
    public static String generateToken(String namedCredential) {
        String token = '';
        HttpRequest request = new HttpRequest();
        HttpResponse response = new HttpResponse();
        Http httpRootObj = new Http();
        request.setEndpoint('callout:' + namedCredential);
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setMethod('POST');
        request.setBody(
            String.format(
                REQUEST_BODY,
                new List<String>{
                    '{!$Credential.SFExternalCredential.client_id}',
                    '{!$Credential.SFExternalCredential.client_secret}',
                    '{!$Credential.SFExternalCredential.username}',
                    '{!$Credential.SFExternalCredential.password}'
                }
            )
        );
        request.setTimeout(60000);

        try {
            response = httpRootObj.send(request);
            Map<String, Object> responseBody = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            token = (String) responseBody.get('access_token');
        } catch (Exception expObj) {
            system.debug('error: ' + expObj);
        }
        return token;
    }

   
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getObjectFieldTypes(String objectApiName) {
        Map<String, String> fieldTypes = new Map<String, String>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe()
            .get(objectApiName)
            .getDescribe()
            .fields.getMap();

        for (String fieldName : fieldMap.keySet()) {
            fieldTypes.put(fieldName, fieldMap.get(fieldName).getDescribe().getType().name());
        }

        return fieldTypes;
    }
    */

    @AuraEnabled
    public static SObject updateBigObjectRecord(Map<String, Object> updatedFields, String objectName) {
        System.debug('updatedFields: ' + updatedFields + ' ' + objectName);

        SObject updatedRecord = null;
        String bigObjectName = createBigObjectName(objectName);
        System.debug('bigObjectName: ' + bigObjectName);

        // Check if updatedFields and other parameters are not null
        if (updatedFields != null && !updatedFields.isEmpty() && bigObjectName != null) {
            // Get the sObjectType dynamically using the object name provided
            Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(bigObjectName);

            if (sObjectType != null) {
                // Create a new instance of the specified sObject type
                updatedRecord = sObjectType.newSObject();

                // Assume phoneNumber is part of the unique index or identifier for the Big Object
                //updatedRecord.put('Phone__c', phoneNumber);

                // Iterate over the updatedFields map and set the fields dynamically
                Map<String, Schema.SObjectField> fieldMap = sObjectType.getDescribe().fields.getMap();
                System.debug('fieldMap: ' + fieldMap);

                for (String fieldName : updatedFields.keySet()) {
                    Object fieldValue = updatedFields.get(fieldName);
                    System.debug('fieldName: ' + fieldName + ', fieldValue: ' + fieldValue);

                    // Check if the field exists in the sObject before setting it
                    // Exclude specific fields like 'CreatedById' or any others you don't want to update
                    if (fieldMap.containsKey(fieldName) && fieldName != 'CreatedById' && fieldName != 'Id') {
                        updatedRecord.put(fieldName, fieldValue);
                    } else {
                        System.debug('Field ' + fieldName + ' does not exist on ' + objectName + ' or is excluded.');
                    }
                }

                System.debug('updatedRecord: ' + updatedRecord);

                // Insert the updated record as a new entry using Database.insertImmediate (for Big Objects)
                try {
                    List<Database.SaveResult> sr = Database.insertImmediate(new List<SObject>{ updatedRecord }); // Insert as a list
                    System.debug('Record inserted successfully' + sr + ' ' + updatedRecord);
                } catch (Exception e) {
                    System.debug('Error inserting record: ' + e.getMessage());
                }
            } else {
                System.debug('sObject type for ' + objectName + ' not found.');
            }
        } else {
            System.debug('Required parameters are missing or empty.');
        }

        return updatedRecord;
    }

    @AuraEnabled(cacheable=true)
    public static String createBigObjectName(String objectApiName) {
        String bigObjectName = '';
        System.debug('objectApiName:' + objectApiName);
        if (String.isNotBlank(objectApiName)) {
            if (objectApiName.endsWith('__c')) {
                bigObjectName = objectApiName.removeEnd('__c') + '__b';
            } else {
                bigObjectName = objectApiName.endsWith('__b') ? objectApiName : objectApiName + '__b';
            }
            return bigObjectName;
        } else {
            return 'Error: Invalid object names';
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getObjectFieldNames(String objectApiName) {
        List<Map<String, String>> objectFieldInfo = new List<Map<String, String>>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe()
            .get(objectApiName)
            .getDescribe()
            .fields.getMap();

        for (Schema.SObjectField fieldName : fieldMap.values()) {
            Schema.DescribeFieldResult fieldDescribe = fieldMap.get(String.valueOf(fieldName)).getDescribe();

            // Check if the field is editable
            if (fieldDescribe.isCreateable()) {
                Map<String, String> fieldInfo = new Map<String, String>();
                fieldInfo.put('name', String.valueOf(fieldName));
                fieldInfo.put('type', fieldDescribe.getType().name());
                fieldInfo.put('label', fieldDescribe.getLabel());
                objectFieldInfo.add(fieldInfo);
            }
        }

        return objectFieldInfo;
    }

    //Method To get label of object
    public static Map<String, String> getFieldLabelToApiNameMap(String objectName) {
        Map<String, String> fieldLabelToApiNameMap = new Map<String, String>();

        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objectName);
        if (sObjectType != null) {
            Map<String, Schema.SObjectField> fieldsMap = sObjectType.getDescribe().fields.getMap();
            for (String fieldName : fieldsMap.keySet()) {
                Schema.SObjectField field = fieldsMap.get(fieldName);
                fieldLabelToApiNameMap.put(field.getDescribe().getLabel(), fieldName);
            }
        }
        return fieldLabelToApiNameMap;
    }

    @AuraEnabled(cacheable=true)
    public static void getBigObjectRecord(String objectName) {
        String soqlQuery = '';
        String removeLastName = '';
        String bigObjectName = '';
        Schema.SObjectType standardObjectType;
        if (objectName.endsWith('__c')) {
            removeLastName = objectName.removeEnd('__c');
            bigObjectName = removeLastName + '__b';
            //soqlQuery = 'SELECT ' + String.join(fieldApiNames, ',') + ' FROM ' + objectApiName;
        } else {
            bigObjectName = objectName + '__b';
        }
        Map<String, String> mapStr = ListViewDataController.getFieldLabelToApiNameMap(bigObjectName);

        /*List<SObject> records = Database.query(soqlQuery);
         return sobjectList;*/
    }
    @AuraEnabled(cacheable=true)
    public static List<SObject> getFieldsOfBigobject(String objectApiName, String arg) {
        String bigObjectName = createBigObjectName(objectApiName);
        String soqlQuery = '';

        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe()
            .get(bigObjectName)
            .getDescribe()
            .fields.getMap();

        List<String> customFieldApiNames = new List<String>();

        for (String fieldName : fieldMap.keySet()) {
            if (fieldName.endsWith('__c')) {
                customFieldApiNames.add(fieldName);
            }

            SObjectType sObjType = ((SObject) Type.forName(bigObjectName).newInstance()).getSObjectType();
            Schema.DescribeFieldResult describe = sObjType.getDescribe().fields.getMap().get(fieldName).getDescribe();

            if (describe.getType() == Schema.DisplayType.REFERENCE) {
                String refFieldName = fieldName.contains('__c') ? fieldName.replace('__c', '__r.Name') : fieldName;
                customFieldApiNames.add(refFieldName);
            }
        }

        System.debug('customFieldApiNames ' + customFieldApiNames);
        if (arg != null) {
            System.debug('not null ' + arg);
            soqlQuery =
                'SELECT ' +
                String.join(customFieldApiNames, ', ') +
                ' FROM ' +
                bigObjectName +
                ' WHERE Phone__c = :arg';
        } else {
            System.debug(' null');
            soqlQuery = 'SELECT ' + String.join(customFieldApiNames, ', ') + ' FROM ' + bigObjectName;
        }

        // Execute the query and fetch records
        List<SObject> records = Database.query(soqlQuery);
        System.debug('records ' + records);
        return records;
    }
}
