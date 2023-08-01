import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TestgameService } from './service/testgame.service';
import { GameData } from './gameData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  Highcharts1: any;
  chartConstructor: string = 'chart';
  chartOptions: any;

  filterPlaytime: number | null = null;
  filteredData: GameData[] = [];

  constructor(private service: TestgameService) {
    this.Highcharts1 = Highcharts;
  }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Thời gian chơi game',
      },
      subtitle: {
        text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>',
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '10px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>',
      },
      series: [
        {
          name: 'Population',
          colors: [
            '#9b20d9',
            '#9215ac',
            '#861ec9',
            '#7a17e6',
            '#7010f9',
            '#691af3',
            '#6225ed',
            '#5b30e7',
            '#533be1',
            '#4c46db',
            '#4551d5',
            '#3e5ccf',
            '#3667c9',
            '#2f72c3',
            '#277dbd',
            '#1f88b7',
            '#1693b1',
            '#0a9eaa',
            '#03c69b',
            '#00f194',
          ],
          colorByPoint: true,
          groupPadding: 0,
          data: [],
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
      ],
    };

    // Data retrieved from https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/

    this.mostData();
  }

  mostData() {
    this.service.mostPopular().subscribe((rs) => {
      const mostResult: GameData[] = rs.results;

      let filteredData: GameData[] = mostResult;

      if (this.filterPlaytime !== null) {
        filteredData = mostResult.filter((item) => {
          if (this.filterPlaytime === 20) {
            return item.playtime === this.filterPlaytime;
          } else if (this.filterPlaytime! > 20) {
            return item.playtime > 20;
          } else {
            return item.playtime < 20;
          }
        });
      }
      const chartData = mostResult.map((item: GameData) => [
        item.name,
        item.playtime,
      ]);
      this.chartOptions.series[0].data = chartData;

      this.Highcharts1.charts[0].update({
        series: this.chartOptions.series,
      });
    });
  }

  applyFilter(filterValue: number | null) {
    let filteredData: any[];

    if (filterValue !== null) {
      filteredData = this.chartOptions.series[0].data.filter((item: any) => {
        const playtime = item[1];
        if (filterValue > 20) {
          return playtime > 20;
        } else if (filterValue < 20) {
          return playtime < 20;
        } else {
          return true;
        }
      });
    } else {
      filteredData = this.chartOptions.series[0].data;
    }

    this.Highcharts1.charts[0].update({
      series: [
        {
          data: filteredData,
        },
      ],
    });
  }
}
