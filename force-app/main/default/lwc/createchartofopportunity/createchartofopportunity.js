import { api, LightningElement, track, wire } from 'lwc';
import getOppData from '@salesforce/apex/getopportunityforchart.getOppData';
export default class Createchartofopportunity extends LightningElement {
    value='BarChart';
    @api chartVal = 'bar';
    @track error;
    chartConfiguration;
    get options(){
        return [
            {label:'bar',value:'bar'},
            {label:'line',value:'line'},
            {label:'pie',value:'pie'},

        ]
    }
    handleChange(event){
          this.chartVal = event.target.value;
          if(this.chartVal == 'bar'){
            let barValue = 'bar'
          }
          else if(this.chartVal == 'line'){
            let lineValue = 'line';
          }
          else{
            let pieValue = 'pie';
          }
    }
   
    @wire(getOppData)
    wireOpp({data,error}){
        if(data){
            let chartAmtData = [];
            let chartRevData = [];
            let chartLabel = [];
            data.forEach(opp=>{
                chartAmtData.push(opp.amount);
                chartRevData.push(opp.expectRevenue);
                chartLabel.push(opp.stage);
            });
            this.chartConfiguration ={
                type : this.chartVal,
                data :{
                    datasets: [{
                        label: 'Amount',
                        backgroundColor: "green",
                        data: chartAmtData,
                    },
                    {
                        label: 'Expected Revenue',
                        backgroundColor: "orange",
                        data: chartRevData,
                    },
                ],
                labels: chartLabel,
                },
                options: {},
            };
            this.error = undefined;
        }
        if(error){
            this.error = error;
            this.chartConfiguration = undefined;
            
        }
    }
}