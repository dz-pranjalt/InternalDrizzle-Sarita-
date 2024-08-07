public with sharing class ListViewDataController {
    private final static String REQUEST_BODY = 'grant_type=password&client_id={0}&client_secret={1}&username={2}&password={3}';
    @AuraEnabled(cacheable=true)
    public static List<SObject> getListViewData(String objectApiName, String listViewName) {
        // Step 1: Get the ListView ID based on the object API name and ListView name
        system.debug('listViewName ' + listViewName + ' objectApiName ' + objectApiName);
        ListView listViewId = [
            SELECT Id, Name, SObjectType
            FROM ListView
            WHERE SObjectType = :objectApiName AND Name = :listViewName
            LIMIT 1
        ];

        //String accessToken = ListViewDataController.generateToken('SalesforceLoginNC');
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
            '00D5j00000Dq9wL!AQwAQKYL93BU83R7ykiGgKauN87.fsOLuaf_hLja54z9bxvUBw2eqTTbIdtQfTqOI_xLNYDSYX41Y67BaY9LvVza.tyUsMd3'
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
            System.debug('column ' + columnObj);
            Map<String, Object> column = (Map<String, Object>) columnObj;
            fieldApiNames.add((String) column.get('fieldApiName'));
        }

        // Step 4: Construct the SOQL query using the field API names
        String soqlQuery = 'SELECT ' + String.join(fieldApiNames, ',') + ' FROM ' + objectApiName;

        // Step 5: Execute the query and return the results
        List<SObject> records = Database.query(soqlQuery);
        return records;
    }

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

    @AuraEnabled
    public static String saveNewRecord(String data, String objectName) {
        // Deserialize the input data into a Map
        Map<String, Object> parsedData = (Map<String, Object>) JSON.deserializeUntyped(data);

        // Get the describe information for the standard object
        Map<String, Schema.SObjectField> stdFieldMap = Schema.getGlobalDescribe()
            .get(objectName)
            .getDescribe()
            .fields.getMap();
        Map<String, String> stdFieldLabelToApiMap = new Map<String, String>();
        for (Schema.SObjectField field : stdFieldMap.values()) {
            Schema.DescribeFieldResult stdFieldDescribe = field.getDescribe();
            stdFieldLabelToApiMap.put(stdFieldDescribe.getLabel(), field.getDescribe().getName());
        }

        // Get the describe information for the big object
        String bObject = objectName + '__b';
        Map<String, Schema.SObjectField> bigFieldMap = Schema.getGlobalDescribe()
            .get(bObject)
            .getDescribe()
            .fields.getMap();
        Map<String, String> bigFieldLabelToApiMap = new Map<String, String>();
        for (Schema.SObjectField field : bigFieldMap.values()) {
            Schema.DescribeFieldResult bigFieldDescribe = field.getDescribe();
            bigFieldLabelToApiMap.put(bigFieldDescribe.getLabel(), field.getDescribe().getName());
        }

        // Create a new SObject for the big object
        SObject bigObjectRecord = Schema.getGlobalDescribe().get(bObject).newSObject();

        // Map values from the standard object to the big object based on matching field labels
        for (String label : stdFieldLabelToApiMap.keySet()) {
            if (bigFieldLabelToApiMap.containsKey(label)) {
                String stdFieldApiName = stdFieldLabelToApiMap.get(label);
                String bigFieldApiName = bigFieldLabelToApiMap.get(label);
                if (parsedData.containsKey(stdFieldApiName)) {
                    bigObjectRecord.put(bigFieldApiName, parsedData.get(stdFieldApiName));
                }
            }
        }

        // Insert the big object record
        try {
            system.debug('bigObjectRecord ' + bigObjectRecord);
            Database.insertImmediate(bigObjectRecord);
        } catch (DmlException e) {
            System.debug('Error inserting big object record: ' + e.getMessage());
            return 'Error: ' + e.getMessage();
        }

        return 'Record inserted successfully';
    }
}
