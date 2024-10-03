import { LightningElement, track, api } from "lwc";
import { refreshApex } from "@salesforce/apex";
import { NavigationMixin } from "lightning/navigation";
import getListViewData from "@salesforce/apex/ListViewDataController.getListViewData";
import getObjectFieldNames from "@salesforce/apex/ListViewDataController.getObjectFieldNames";
import getObjectFieldTypes from "@salesforce/apex/ListViewDataController.getObjectFieldTypes";
import saveNewRecord from "@salesforce/apex/ListViewDataController.saveNewRecord";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
const PAGE_SIZE = 10;
export default class GetDynamicObjectData extends NavigationMixin(LightningElement) {
    @track data;
    @track error;
    @track columns;
    @track isLoading = false;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track showLoadMore = false;
    initialRecords = [];
    @track fiedls = [];
    previousValue;
    @api objectApiName;
    @api listViewName;
    @track currentPageRecords;

    @api recordId;
    showSpinner = true;
    isCreateclicked = false;
    @track fields = [];
    listViewFields;

    get objectListviewName() {
        return this.objectApiName + " with " + this.listViewName;
    }

    connectedCallback() {
        this.fetchData();
    }

    fetchData() {
        Promise.all([
            getListViewData({
                objectApiName: this.objectApiName,
                listViewName: this.listViewName
            }),
            getObjectFieldTypes({ objectApiName: this.objectApiName })
        ])
            .then((results) => {
                const [records, fieldTypes] = results;
                //console.log("records", records);
                //store the records
                this.listViewFields = records;
                //console.log("this.listViewFields", this.listViewFields);

                // Map records to include URLs for Name and Account
                this.initialRecords = records.map((record) => ({
                    ...record,
                    Account: record.Account ? record.Account.Name : null,
                    Owner: record.Owner.Alias ? record.Owner.Alias : null,

                    AccountUrl:
                        (this.objectApiName === "Contact" || this.objectApiName === "Opportunity") &&
                        record.Account &&
                        record.Account.Id
                            ? `/${record.Account.Id}`
                            : null,
                    NameUrl: record.Id ? `/${record.Id}` : null,
                    OwnerUrl: record.OwnerId ? `/${record.OwnerId}` : null
                }));

                this.columns = this.generateColumns(records, fieldTypes);
                this.error = undefined;
                this.totalRecords = this.initialRecords.length;
                this.paginationHelper();
                this.showLoadMore = this.totalRecords > PAGE_SIZE;
                this.showSpinner = false;
            })
            .catch((error) => {
                this.error = error;
                console.log("error", error);
                this.initialRecords = undefined;
                this.columns = undefined;
            });
    }

    generateColumns(data, fieldTypes) {
        let columns = [];

        // Check if we need to include the "Name" column as a URL
        if (data && data.length > 0) {
            columns.push({
                label: "Name",
                fieldName: "NameUrl",
                type: "url",
                typeAttributes: { label: { fieldName: "Name" }, target: "_blank" }
            });
            columns.push({
                label: "Account",
                fieldName: "AccountUrl",
                type: "url",
                typeAttributes: { label: { fieldName: "Account" }, target: "_blank" }
            });

            // Add other dynamic fields
            for (let field in data[0]) {
                if (
                    // eslint-disable-next-line no-prototype-builtins
                    data[0].hasOwnProperty(field) &&
                    field !== "Name" &&
                    field !== "AccountName" &&
                    !field.toLowerCase().includes("id")
                ) {
                    let type = fieldTypes[field] || "text";
                    columns.push({
                        label: field,
                        fieldName: field,
                        type: this.mapFieldType(type)
                    });
                }
            }
        }
        //console.log("columns ", JSON.stringify(columns));
        return columns;
    }

    mapFieldType(fieldType) {
        const typeMapping = {
            STRING: "text",
            INTEGER: "number",
            DOUBLE: "number",
            DATE: "date",
            DATETIME: "date",
            BOOLEAN: "boolean",
            CURRENCY: "currency",
            PERCENT: "percent",
            PHONE: "phone",
            EMAIL: "email",
            URL: "url"
        };
        return typeMapping[fieldType] || "text";
    }

    paginationHelper() {
        this.currentPageRecords = this.initialRecords.slice(0, PAGE_SIZE);
    }

    loadMore() {
        const startIndex = this.pageNumber * PAGE_SIZE;
        console.log("startIndex", startIndex);
        const endIndex = Math.min(startIndex + PAGE_SIZE, this.totalRecords);
        console.log("endIndex load more", endIndex);
        if (endIndex <= this.totalRecords) {
            this.pageNumber++;
            this.data = [...this.data, ...this.initialRecords.slice(startIndex, endIndex)];
        }
        this.showLoadMore = endIndex < this.totalRecords;
        console.log("this.showLoadMore in load more", this.showLoadMore);
    }

    handleSearch(event) {
        const searchKey = event.target.value.toLowerCase();
        if (searchKey) {
            this.data = this.initialRecords.filter((record) =>
                Object.values(record).some((value) => String(value).toLowerCase().includes(searchKey))
            );
        } else {
            this.paginationHelper();
        }
    }

    handleRefresh() {
        //this.retrieveRecords();
        this.isLoading = true;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
        refreshApex(this.refreshData);
    }

    //Reset the the page
    handleReset() {
        const inputFields = this.template.querySelectorAll("lightning-input-field");
        if (inputFields) {
            inputFields.forEach((field) => {
                field.reset();
            });
        }
        this.hideCreateForm();
    }

    // on select checkbox present in row
    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedRow = selectedRows.length > 0 ? selectedRows[0] : null;
        this.isEditDisabled = !this.selectedRow;
    }

    // Create new reocrd
    async handleCreate() {
        this.isCreateclicked = true;
        this.showSpinner = true;
        let fieldSetResult = {};
        try {
            fieldSetResult = await getObjectFieldNames({ objectApiName: this.objectApiName });
            this.fields = this.processFields(fieldSetResult);
        } catch (error) {
            console.error("Error fetching field names:", error);
            this.showSpinner = false;
        }
        this.showSpinner = false;
    }

    //method to fields
    processFields(fieldSetResult) {
        //console.log("fieldSetResult", JSON.stringify(fieldSetResult));
        //get listview fields to create form
        let fieldsToShow = Object.keys(this.listViewFields[0]).map((element) => element.toLowerCase());
        console.log("keys", JSON.stringify(fieldsToShow));

        //const fieldsToShow = ["firstname", "lastname", "email", "phone", "title"];
        //ListviewFields =["Name","AccountId","Title","Phone","Email","OwnerId","Id","Account","Owner"]

        // Replace "name" with "first name" and "last name" in fieldsToShow
        if (fieldsToShow.includes("name")) {
            const index = fieldsToShow.indexOf("name");
            fieldsToShow.splice(index, 1, "firstname", "lastname");
        }

        return fieldSetResult
            .filter((field) => fieldsToShow.includes(field.name.toLowerCase()))
            .map((field) => ({
                name: field.name,
                type: field.type.toLowerCase(),
                label: field.label
            }));
    }

    // Hide Create form
    hideCreateForm() {
        this.isCreateclicked = false;
    }

    showToast(variant, message, title) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    //onSubmit create bigObject Record
    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const saveRecordData = event.detail.fields;
        console.log("handleSubmit: ", saveRecordData);

        try {
            let result = saveNewRecord({ data: JSON.stringify(saveRecordData), objectName: this.objectApiName });
            console.log("result: ", result); // Log the result
        } catch (error) {
            console.error(error); // Log any errors
        }
        this.isCreateclicked = true;
    }

    handleSucess(event) {
        const updatedRecord = event.detail.id;
        console.log("onsuccess: ", updatedRecord);
    }
}
