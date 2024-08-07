import { LightningElement } from 'lwc';
import getJobDetails from '@salesforce/apex/batchProgressIndicatorController.getJobDetails';
import executeBatch from '@salesforce/apex/batchProgressIndicatorController.executeBatch';
export default class BatchProgressIndicator extends LightningElement {

    batchJobId;
    executedPercentage;
    executedIndicator;
    executedBatch;
    totalBatch;
    isBatchCompleted = false;
    batchClassName;
    batchSize;
    disableExecuteBatch = false;

    handleBatchNameChange(event){
        this.batchClassName = event.currentTarget.value;
        console.log('batchName ',this.batchClassName);
    }
    handleBatchSizeChange(event){
        this.batchSize = parseInt(event.currentTarget.value);
        console.log('batchsize ',this.batchSize);
    }
    handleExecuteBatch() {
        this.disableExecuteBatch = true;
        executeBatch({
            className: this.batchClassName,
            chunkSize: this.batchSize
        }).then(res => {
            console.log('response => ', res);
            if (res) {
                this.batchJobId = res;
                //this.getBatchStatus();
            }
        }).catch(err => {
            console.log('err ', err);

        })
    }
    
    getBatchStatus(event){
        getJobDetails({ jobId: this.batchJobId }).then(res => {
            console.log('response => ', res);
            if (res[0]) {
                this.totalBatch = res[0].TotalJobItems;
                if (res[0].TotalJobItems == res[0].JobItemsProcessed) {
                    this.isBatchCompleted = true;
                }
                this.executedPercentage = ((res[0].JobItemsProcessed / res[0].TotalJobItems) * 100).toFixed(2);
                this.executedBatch = res[0].JobItemsProcessed;
                var executedNumber = Number(this.executedPercentage);
                this.executedIndicator = Math.floor(executedNumber);
                // this.refreshBatchOnInterval();  //enable this if you want to refresh on interval
            }
        }).catch(err => {
            console.log('err ', err);

        })
    }
    handleRefreshView(event){
        this.getBatchStatus();
    }
    refreshBatchOnInterval() {
        this._interval = setInterval(() => {
            if (this.isBatchCompleted) {
                clearInterval(this._interval);
            } else {
                this.getBatchStatus();
            }
        }, 10000); //refersh view every time
    }
}