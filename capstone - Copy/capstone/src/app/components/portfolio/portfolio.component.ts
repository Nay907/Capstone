import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BugsService } from 'src/app/shared/services/bugs.service';
import {Chart, ChartData, ChartOptions, registerables } from 'chart.js/auto';
import { Portfolio } from 'src/app/shared/models/Portfolio';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements AfterViewInit{
  @ViewChild('bugChartCanvas') bugChartCanvas: ElementRef<HTMLCanvasElement>;
  summary!: Portfolio;
  totalBugCount: number = 0;
  bugCountByLowSeverity: number = 0;
  bugCountByMediumSeverity: number = 0;
  bugCountByHighSeverity: number = 0;
  chart: Chart | undefined;
  chartOptions: ChartOptions = {
    responsive: true,
  };
  showChartFlag1 = false;
  chartData1: ChartData = {
    labels: ['Total', 'High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Bug Count',
        data: [0, 0, 0, 0], 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
 };
  constructor(private bugsService: BugsService) { }

  ngAfterViewInit(): void {
    this.getBugsData();
  }

  getBugsData(): void {
    const totalBugCount$ = this.bugsService.getTotalBugCount();
    const bugCountByLowSeverity$ = this.bugsService.getBugCountByLowSeverity();
    const bugCountByMediumSeverity$ = this.bugsService.getBugCountByMediumSeverity();
    const bugCountByHighSeverity$ = this.bugsService.getBugCountByHighSeverity();

    forkJoin([totalBugCount$, bugCountByLowSeverity$, bugCountByMediumSeverity$, bugCountByHighSeverity$]).subscribe({
      next: ([totalBugCount, bugCountByLowSeverity, bugCountByMediumSeverity, bugCountByHighSeverity]) => {
        this.totalBugCount = totalBugCount;
        this.bugCountByLowSeverity = bugCountByLowSeverity;
        this.bugCountByMediumSeverity = bugCountByMediumSeverity;
        this.bugCountByHighSeverity = bugCountByHighSeverity;
        this.updateChartData();
      },
      error: (error) => {
        console.log(error); 
      }
    });
 }

 updateChartData(): void {
    this.chartData1.datasets[0].data = [
      this.totalBugCount,
      this.bugCountByHighSeverity,
      this.bugCountByMediumSeverity,
      this.bugCountByLowSeverity
    ];
    this.renderChart();
 }

 renderChart(): void {
  if (this.bugChartCanvas && this.bugChartCanvas.nativeElement) {
    const canvas = this.bugChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      Chart.register(...registerables);
      if (this.chart) {
        this.chart.destroy(); 
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.chartData1,
        options: this.chartOptions,
      });
    }
 } else {
    console.error('Canvas element not found');
 }
 }

 showChart1(): void {
    this.showChartFlag1 = !this.showChartFlag1;
    if (this.showChartFlag1) {
      this.renderChart();
    } else {
      this.closeChart1();
    }
 }

 closeChart1(): void {
    this.showChartFlag1 = false;
    if (this.chart) {
      this.chart.destroy();
    }
 }
}
