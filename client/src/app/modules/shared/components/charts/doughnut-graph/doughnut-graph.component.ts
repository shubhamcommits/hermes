import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss']
})
export class DoughnutGraphComponent implements OnInit {


  @Input('labels') public doughnutChartLabels = ['North BV(%)', 'South BV(%)', 'East BV(%)', 'West BV(%)'];
  public doughnutChartData: any = [];
  @Input('data') data: any = []
  public doughnutChartType: any = 'doughnut';
  public doughnutChartColors = [{
    backgroundColor: [
      '#4e73df',
      '#1cc88a',
      '#36b9cc',
      '#f6c23e'
    ]
  }];
  public options = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: '#fff',
        fontStyle: 'bold',
        precision: 2,
        arc: false,
        textShadow: true,
      },
      doughnutlabel: {
        labels: [{
          text: '550',
          font: {
            size: 20,
            weight: 'bold'
          }
        }, {
          text: 'total'
        }]
      }
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
          return label + ':' + formattedvalue;
        }
      }
    }
  }

  ngOnInit(): void {
    this.doughnutChartData = [this.data]
  }

  ngOnChanges() {
    this.doughnutChartData = [this.data]
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
