import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';

@Component({
  selector: 'app-coronavirus-chart-pie',
  templateUrl: './coronavirus-chart-pie.component.html',
  styleUrls: ['./coronavirus-chart-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusChartPieComponent implements OnInit, OnDestroy {

  @Input() dataGender;
  @Input() dataTest;
  dataType;
  labelText: string;
  chart: am4charts.PieChart;
  choices: any[];
  constructor() {
  }

  ngOnInit(): void {
    if (this.dataGender) {
      this.dataType = 'hospital';
    } else {
      this.dataType = 'total';
    }
    this.initChart();
    this.onSelectTypeChange();
  }

  initChart(): void {
    this.chart = am4core.create('chartdiv', am4charts.PieChart);
    this.chart.responsive.enabled = true;
    this.chart.language.locale = am4lang_fr_FR;
    const pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'category';
    const as = pieSeries.slices.template.states.getKey('active');
    as.properties.shiftRadius = 0;
    pieSeries.slices.template.propertyFields.fill = 'color';
    pieSeries.alignLabels = false;
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color('black');
    if (this.dataGender) {
      pieSeries.labels.template.fill = am4core.color('white');
    }
    pieSeries.labels.template.fontSize = 13;
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.text = "{category} \n {value} soit {value.percent.formatNumber('#.0')}%";
    pieSeries.tooltip.autoTextColor = false;
    pieSeries.tooltip.label.fill = am4core.color('#FFFFFF');
  }


  onSelectTypeChange(): void {
    if (this.dataGender) {
      this.changeTypeForPieGender();
    } else {
      this.changeTypeForPieTest();
    }
  }

  changeTypeForPieGender(): void {
    this.choices = [
      { label: 'Hospitalisations en cours', value: 'hospital' },
      { label: 'Réanimations en cours', value: 'reanimation' },
      { label: 'Décès', value: 'deaths' },
      { label: 'Guéris', value: 'recovered' }
    ];
    this.labelText = 'Répartition des cas guéris selon le genre';
    const menValue = this.dataGender.men[this.dataType];
    const womenValue = this.dataGender.women[this.dataType];
    if (this.dataType === 'hospital') {
      this.labelText = 'Répartition des hospitalisations en cours selon le genre';
    } else if (this.dataType === 'reanimation') {
      this.labelText = 'Répartition des réanimations en cours selon le genre';
    } else if (this.dataType === 'deaths') {
      this.labelText = 'Répartition des décès selon le genre';
    }
    this.chart.data = [
      {
        category: `Femme`,
        value: menValue,
        color: am4core.color('#fd5260')
      },
      {
        category: `Homme`,
        value: womenValue,
        color: am4core.color('#4a8cfd')
      },
    ];
  }

  changeTypeForPieTest(): void {
    this.choices = [
      { label: 'Total', value: 'total' },
      { label: 'Homme', value: 'men' },
      { label: 'Femme', value: 'women' },
    ];
    let positive = 0;
    let negative = 0;
    if (this.dataType === 'total') {
      positive = this.dataTest.testTotalPositive;
      negative = this.dataTest.testTotalNegative;
      this.labelText = `Répartition des tests positifs et négatifs pour dépistage du COVID-19
      sur les ${this.dataTest.testTotal} effectués au total`;
    } else if (this.dataType === 'men') {
      positive = this.dataTest.testMenPositive;
      negative = this.dataTest.testMenNegative;
      this.labelText = `Répartition des tests positifs et négatifs pour dépistage du COVID-19 les
      ${this.dataTest.testMen} effectués chez l\'homme`;
    } else if (this.dataType === 'women') {
      positive = this.dataTest.testWomenPositive;
      negative = this.dataTest.testWomenNegative;
      this.labelText = `Répartition des tests positifs et négatifs pour dépistage
      du COVID-19 sur les ${this.dataTest.testWomen} effectués chez la femme`;
    }

    this.chart.data = [
      {
        category: `Tests négatifs`,
        value: negative,
        color: am4core.color('#f2f2f2')
      },
      {
        category: `Tests positifs`,
        value: positive,
        color: am4core.color('#f9461c')
      },
    ];
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

}