import { Component, OnInit } from '@angular/core';
import { FRANCE_REGIONS, FRANCE_DEPS } from '@coronavirus/constants/france.constants';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coronavirus-links-france-test',
  templateUrl: './coronavirus-links-france-test.component.html',
  styleUrls: ['./coronavirus-links-france-test.component.css']
})
export class CoronavirusLinksFranceTestComponent implements OnInit {

  regions: any[] = FRANCE_REGIONS;
  departments: any[] = FRANCE_DEPS;

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.initMetaTag();
  }

  private initMetaTag(): void {
    this.title.setTitle('Tests de dépistage Coronavirus COVID-19 France');
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département' },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: 'https://www.cascoronavirus.fr/stats/liens/france' },
      { name: 'og:title', content: 'Tests de dépistage Coronavirus COVID-19 France' },
      // tslint:disable-next-line:max-line-length
      { name: 'og:description', content: 'Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département' },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Tests de dépistage Coronavirus COVID-19 France' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}