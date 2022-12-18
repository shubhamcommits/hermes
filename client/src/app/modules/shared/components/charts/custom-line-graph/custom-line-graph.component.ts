import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-line-graph',
  templateUrl: './custom-line-graph.component.html',
  styleUrls: ['./custom-line-graph.component.scss']
})
export class CustomLineGraphComponent implements OnInit {

  constructor() { }

  // Line Chart Inputs
  @Input('width') width = 600
  @Input('height') height = 400
  @Input('data') data = []
  @Input('labels') labels = []
  @Input('legendNames') legendNames = []

  // Line Chart Variables
  public lineChartLabels: any = []
  public lineChartData: any = []
  public lineChartColors: any = [
    {
      borderColor: 'black',
      backgroundColor: '#4e73df',
    },
  ]
  public lineChartLegend: any = true
  public lineChartType: any = 'line'
  public lineChartPlugins: any = []

  // Line Chart Options
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          fontStyle: 'bold',
          fontSize: '15',
          padding: '6',
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          let datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || 'Other';
          let formattedvalue = this.formatNumber(datasetLabel) || 0;
          if (datasetLabel < 10000) {
            formattedvalue = datasetLabel
          }
          let label = data.labels[tooltipItem.index];
          return formattedvalue;
        }
      }
    }
  }

  ngOnInit(): void {
    if(this.legendNames.length == this.data.length){
      for(let index = 0; index < this.legendNames.length; index++ ){
        this.lineChartData[index] = {
          data: this.data[index],
          label: this.legendNames[index]
        }
      }
    }
    this.lineChartLabels = this.labels
  }

  ngOnChanges() {
    if(this.legendNames.length == this.data.length){
      for(let index = 0; index < this.legendNames.length; index ++){
        this.lineChartData[index] = {
          data: this.data[index],
          label: this.legendNames[index]
        }
      }
    }
    this.lineChartLabels = this.labels
  }

  public formatNumber(labelValue: any) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+7

      ? Number(Math.abs(Number(labelValue)) / 1.0e+7).toFixed(2) + "Cr"
      // Six Zeroes for Millions 
      : Number(Math.abs(Number(labelValue)) >= 1.0e+5).toFixed(2)

        ? Number(Math.abs(Number(labelValue)) / 1.0e+5).toFixed(2) + "L"
        // Three Zeroes for Thousands
        : Number(Math.abs(Number(labelValue)) >= 1.0e+3).toFixed(2)

          ? Number(Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

          : Number(Math.abs(Number(labelValue))).toFixed(2);

  }

}
