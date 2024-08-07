import { LightningElement } from 'lwc';
import hasApex from '@salesforce/userPermission/AuthorApex';
import hasAllowEmailIc from '@salesforce/userPermission/AllowEmailIC';
import hasEditTask from '@salesforce/userPermission/EditTask';
import hasImportLeads from '@salesforce/userPermission/ImportLeads';
import hasModifyData from '@salesforce/userPermission/ModifyAllData';
export default class UserPermisionLwc extends LightningElement {

    get hasApex(){
        return hasApex;
    }
    get hasEmailIc(){
        return hasAllowEmailIc;
    }
    get hasEditTask(){
        return hasEditTask;
    }
    get hasImport(){
        return hasImportLeads;
    }
    get hasModify(){
        return hasModifyData;
    }
    handleClick(){
        console.log('click...')
    }
}