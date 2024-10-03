import { LightningElement, api } from "lwc";
import getFieldsOfBigobject from "@salesforce/apex/getBigObjectDataController.getFieldsOfBigobject";
import getObjectFieldLabels from "@salesforce/apex/getBigObjectDataController.getObjectFieldLabels";

//const PAGE_SIZE = 10;
export default class GetBigObjectData extends LightningElement {
    @api objectApiName;

    columns = [];
    records = [];
    showSpinner = false;

    connectedCallback() {
        this.fetchData();
    }

    fetchData() {
        this.showSpinner = true;
        Promise.all([
            getFieldsOfBigobject({
                objectApiName: this.objectApiName
            }),
            getObjectFieldLabels({
                objectApiName: this.objectApiName
            })
        ])
            .then((results) => {
                const [record, column] = results;
                this.columns = column;
                this.records = JSON.parse(JSON.stringify(record));
                // console.log("records", JSON.stringify(record));
                // console.log("Column", JSON.stringify(column));
                this.showSpinner = false;
            })
            .catch((error) => {
                this.error = error;
                console.log("error", error);
                this.showSpinner = false;
                this.initialRecords = undefined;
                this.columns = undefined;
            })
            .finally(() => {
                this.showSpinner = false;
            });
    }
}
