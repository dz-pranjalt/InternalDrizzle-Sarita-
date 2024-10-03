public without sharing class ListViewDataController2 {
    private final static String REQUEST_BODY = 'grant_type=password&client_id={0}&client_secret={1}&username={2}&password={3}';

    @AuraEnabled
    public static List<SObject> getListViewData(String objectApiName, String listViewName) {
        List<SObject> returndata = new List<SObject>();

        // Step 1: Get the ListView ID based on the object API name and ListView name
        System.debug('listViewName ' + listViewName + ' objectApiName ' + objectApiName);
        ListView listViewId = [
            SELECT Id, Name, SObjectType
            FROM ListView
            WHERE SObjectType = :objectApiName AND Name = :listViewName
            LIMIT 1
        ];

        // Generate the access token
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
            '00D5j00000Dq9wL!AQwAQN1_2WPEirvHnqaaOrDdC0sCY3L6nlSjWnBQiq4UaBl7Ad0rHFnuDnn2Cc_90y9Ag.8quiwtF3yOIF4UFt4GIlcCebXp'
        );

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() != 200) {
            throw new CalloutException('Failed to get list view data: ' + res.getBody());
        }

        // Step 3: Parse the JSON response to get field API names
        Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        List<Object> displayColumns = (List<Object>) jsonResponse.get('displayColumns');
        //System.debug('displayColumns' + displayColumns);
        List<String> fieldLabelNames = new List<String>();
        Map<String, String> fieldLabelType = new Map<String, String>();
        for (Object columnObj : displayColumns) {
            Map<String, Object> column = (Map<String, Object>) columnObj;
            fieldLabelNames.add((String) column.get('label'));
            String colName = (String) column.get('fieldApiName');
            if (
                String.isNotBlank((String) column.get('lookupId')) &&
                (String) column.get('lookupId') != 'Id' &&
                colName.contains('.') &&
                !colName.contains('Owner') &&
                !colName.contains('CreatedBy') &&
                !colName.contains('LastModifyBy')
            ) {
                List<String> colNames = colName.split('\\.');
                System.debug('colNames:' + colNames);
                String fieldApiName = (String) column.get('lookupId');
                String fieldName;
                if (colName.contains('.') && !colName.contains('__r')) {
                    fieldName = fieldApiName.contains('__r') ? fieldApiName : fieldApiName + '__r.' + colNames[1];
                } else {
                    fieldName = colName;
                }
                //System.debug('fieldName:' + fieldName);

                fieldLabelType.put(
                    fieldApiName.contains('__c') ? fieldApiName.toLowerCase() : (fieldApiName + '__c').toLowerCase(),
                    fieldName
                );
            }
        }
        System.debug('fieldLabelNames: ' + fieldLabelNames);
        // Step 4: Get the records from the big object using getFieldsOfBigobject
        List<SObject> bigObjectRecords = getFieldsOfBigobject(objectApiName, null);

        // Step 5: Filter records to include only fields with matching labels
        List<SObject> filteredRecords = new List<SObject>();
        String bigObjectName = createBigObjectName(objectApiName);

        for (SObject record : bigObjectRecords) {
            SObject filteredRecord = record.getSObjectType().newSObject();
            Boolean hasMatchingFields = false;
            System.debug('record ' + record);
            // Compare field labels directly with the list view field labels
            for (String fieldLabel : fieldLabelNames) {
                System.debug('fieldLabel: ' + fieldLabel);
                for (String fieldName : record.getSObjectType().getDescribe().fields.getMap().keySet()) {
                    System.debug('fieldName: ' + fieldName);
                    Schema.DescribeFieldResult describe = record.getSObjectType()
                        .getDescribe()
                        .fields.getMap()
                        .get(fieldName)
                        .getDescribe();
                    System.debug('describe: ' + describe.getLabel());
                    if (describe.getLabel() == fieldLabel) {
                        if (
                            fieldLabelType.containsKey(fieldName.toLowerCase()) &&
                            fieldLabelType.get(fieldName.toLowerCase()) != 'Id'
                        ) {
                            System.debug('fieldLabelType' + fieldLabelType);
                            filteredRecord.put(fieldName, record.get(fieldName));

                            String buildFieldName = fieldLabelType.get(fieldName.toLowerCase());
                            List<String> fielsNames = buildFieldName.split('\\.');
                            System.debug('fielsNames:' + fielsNames);
                            String fieldValue = (String) record.getSObject(fielsNames[0])?.get(fielsNames[1]);
                            System.debug('buildFieldName:' + buildFieldName);
                            System.debug('fieldValue:' + fieldValue);
                            SObjectType sObjType = ((SObject) Type.forName(bigObjectName).newInstance())
                                .getSObjectType();
                            System.debug('sObjType:' + sObjType);
                            System.debug('sObjType++:' + sObjType.getDescribe().fields.getMap());
                            String obj = sObjType.getDescribe()
                                    .fields.getMap()
                                    .get(fieldName)
                                    .getDescribe()
                                    .getReferenceTo()[0]
                                .getDescribe()
                                .getName();
                            System.debug('obj:' + obj);
                            if (obj != 'Case') {
                                SObject parentObjet1 = ((SObject) Type.forName(obj).newInstance())
                                    .getSObjectType()
                                    .newSObject();
                                System.debug('parentObjet1:' + parentObjet1);
                                parentObjet1.put(fielsNames[1], fieldValue);
                                parentObjet1.put('Id', record.get(fieldName));
                                System.debug('parentObjet1:' + parentObjet1);
                                filteredRecord.putSObject(fielsNames[0], parentObjet1);
                                System.debug('filteredRecord:' + filteredRecord);
                                // filteredRecord.put(buildFieldName, fieldValue);
                            } else {
                                // Handle the Case object separately since CaseNumber is not editable
                                SObject caseRecord = new Case();
                                System.debug('caseRecord (before update):' + caseRecord);

                                // Update the fields that are editable on the Case record
                                caseRecord.put('Id', record.get(fieldName)); // Set the Case Id
                                //caseRecord.put(fielsNames[1], fieldValue); // Update the appropriate field, not CaseNumber

                                System.debug('caseRecord (after update):' + caseRecord);

                                // Put the case record into the filtered record
                                filteredRecord.putSObject(fielsNames[0], caseRecord);
                                System.debug('filteredRecord with Case:' + filteredRecord);
                            }
                        } else {
                            filteredRecord.put(fieldName, record.get(fieldName));
                        }
                        hasMatchingFields = true; // Mark that this record has matching fields
                    }
                }
            }

            // Only add records that have at least one matching field
            if (hasMatchingFields) {
                //System.debug('filteredRecord: ' + filteredRecord);
                filteredRecords.add(filteredRecord);
                System.debug('size' + filteredRecord);
            }
        }
        System.debug('filteredRecords' + filteredRecords);
        return filteredRecords;
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
                // String refFieldName = fieldName.contains('__c') ? fieldName.replace('__c', '__r.Name') : fieldName;
                //customFieldApiNames.add(refFieldName);
                String refFieldName = '';
                if (fieldName.contains('case')) {
                    refFieldName = fieldName.replace('__c', '__r.CaseNumber');
                } else if (fieldName.contains('__c')) {
                    refFieldName = fieldName.replace('__c', '__r.Name');
                } else {
                    refFieldName = fieldName;
                }
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

        System.debug('soqlQuery' + soqlQuery);

        // Execute the query and fetch records
        List<SObject> records = Database.query(soqlQuery);
        System.debug('records ' + records);
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

        System.debug('objectFieldInfo' + objectFieldInfo);

        return objectFieldInfo;
    }

    // Method to map field label to API name
    public static String getFieldApiNameFromLabel(String label, String objectName) {
        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objectName);
        if (sObjectType != null) {
            Map<String, Schema.SObjectField> fieldsMap = sObjectType.getDescribe().fields.getMap();
            for (String fieldName : fieldsMap.keySet()) {
                if (fieldsMap.get(fieldName).getDescribe().getLabel() == label) {
                    return fieldName;
                }
            }
        }
        return null;
    }

    // Create Big Object Name
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
    public static List<Map<String, String>> getObjectFieldNames(String objectApiName) {
        //String bigObjectName = createBigObjectName(objectApiName);
        System.debug('objectApiName' + objectApiName);
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

    @AuraEnabled
    public static Map<String, Object> saveNewRecord(String data, String objectName) {
        Map<String, Object> result = new Map<String, Object>();

        // Retrieve the SObjectType for the provided Big Object name
        Schema.SObjectType bigObjectType = Schema.getGlobalDescribe().get(objectName);

        // Ensure the bigObjectType is not null
        if (bigObjectType == null) {
            result.put('isSuccess', 'false');
            result.put('message', 'Invalid object name provided');
            return result;
        }

        // Deserialize the input data into a Map
        Map<String, Object> parsedData = (Map<String, Object>) JSON.deserializeUntyped(data);
        System.debug('parsedData: ' + parsedData);
        // Retrieve the email value from the parsed data
        String email = (String) parsedData.get('Phone__c');

        // Print the email value
        System.debug('Phone__c: ' + email);

        //check email is already present or not
        String query = 'SELECT Id FROM ' + objectName + ' WHERE Phone__c = \'' + email + '\'';
        system.debug('query' + query);

        List<SObject> records = Database.query(query);
        system.debug('records' + records.size());
        if (records.size() > 0) {
            result.put('isSuccess', 'false');
            result.put('message', 'Record already exists with this email.');
            return result;
        } else {
            try {
                // Create a new instance of the Big Object
                SObject bigObjectRecord = bigObjectType.newSObject();

                // Map values from the parsed data to the Big Object fields
                for (String fieldName : parsedData.keySet()) {
                    bigObjectRecord.put(fieldName, parsedData.get(fieldName));
                }
                System.debug('bigObjectRecord: ' + bigObjectRecord);

                if (!Test.isRunningTest()) {
                    // Insert the big object record
                    Database.insertImmediate(bigObjectRecord);
                }

                result.put('isSuccess', 'true');
                result.put('message', 'Record inserted successfully');
                return result;
            } catch (Exception e) {
                System.debug('Error inserting big object record: ' + e.getMessage());
                result.put('status', 'false');
                result.put('message', 'Error: ' + e.getMessage());
                return result;
            }
        }
    }

    /*
    @AuraEnabled
    public static SObject updateBigObjectRecord(
        String phoneNumber,
        Map<String, Object> updatedFields,
        String objectName
    ) {
        System.debug('phoneNumber: ' + phoneNumber);
        System.debug('updatedFields: ' + updatedFields + ' ' + objectName);

        SObject updatedRecord = null;
        String bigObjectName = createBigObjectName(objectName);
        System.debug('bigObjectName: ' + bigObjectName);

        // Check if updatedFields and other parameters are not null
        if (phoneNumber != null && updatedFields != null && !updatedFields.isEmpty() && bigObjectName != null) {
            // Get the sObjectType dynamically using the object name provided
            Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(bigObjectName);

            if (sObjectType != null) {
                // Create a new instance of the specified sObject type
                updatedRecord = sObjectType.newSObject();

                // Assume phoneNumber is part of the unique index or identifier for the Big Object
                updatedRecord.put('Phone__c', phoneNumber);

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
    */
}
