import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { Observable } from 'rxjs';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FRANCE_REGIONS, FRANCE_DEPS } from '@coronavirus/constants/france.constants';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-coronavirus-sheet-test',
  templateUrl: './coronavirus-sheet-test.component.html',
  styleUrls: ['./coronavirus-sheet-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusSheetTestComponent implements OnInit {

  dataTest$: Observable<any>;
  selectedDivisionMap = 'regionFrance';
  selectedCountry: any = COUNTRIES[1];
  selectedDepartment: any;
  selectedRegion: any;
  selectedTypeMap = 'ageAll';
  selectedDivisionMapTable = 'regionFrance';
  labelTableAge = 'à tous les âges';

  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.country) {
        return;
      }
      if (params.department) {
        this.selectedDepartment = FRANCE_DEPS.find((department) => department.slug === params.department);
        if (!this.selectedDepartment) {
          this.router.navigateByUrl('/');
          return;
        }
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('department', this.selectedDepartment.code);
        this.initMetaTagRegionAndDepartment(this.selectedDepartment, 'le département');
      } else if (params.region) {
        this.selectedRegion = FRANCE_REGIONS.find((region) => region.slug === params.region);
        if (!this.selectedRegion) {
          this.router.navigateByUrl('/');
          return;
        }
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('region', this.selectedRegion.code);
        this.initMetaTagRegionAndDepartment(this.selectedRegion, 'la région');
      } else {
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('national');
        this.initMetaTagFrance();
      }
      this.ref.detectChanges();
    });
  }

  onSelectTypeMap(type: string): void {
    const age = {
      ageAll: 'à tous les âges',
      ageA: 'chez les moins de 15 ans',
      ageB: 'chez les 15-44 ans',
      ageC: 'chez les 45-64 ans',
      ageD: 'chez les 65-74 ans',
      ageE: 'chez les plus de 75 ans',
    };
    this.selectedTypeMap = type;
    this.labelTableAge = age[type];
  }

  onSelectCountry(country: any): void {
    this.selectedCountry = country;
    this.selectedRegion = undefined;
    this.selectedDepartment = undefined;
    this.router.navigate(['test-depistage', this.selectedCountry.slug]);
  }



  private initMetaTagRegionAndDepartment(region: any, type: string): void {
    this.title.setTitle(`Tests de dépistage Coronavirus COVID-19 ${region.name}`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Tests de dépistage Coronavirus COVID-19 ${region.name} - Suivez les tests de dépistage pour diagnostic de COVID-19 dans ${type} ${region.name}` },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: `https://www.cascoronavirus.fr/stats/${region.slug}` },
      { name: 'og:title', content: `Tests de dépistage Coronavirus COVID-19 ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { name: 'og:description', content: `Tests de dépistage Coronavirus COVID-19 ${region.name} - Suivez les tests de dépistage pour diagnostic de COVID-19 dans ${type} ${region.name}` },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Tests de dépistage Coronavirus COVID-19 ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Tests de dépistage Coronavirus COVID-19 ${region.name} - Suivez les tests de dépistage pour diagnostic de COVID-19 dans ${type} ${region.name}` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagFrance(): void {
    this.title.setTitle(`Tests de dépistage Coronavirus COVID-19 France`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département` },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: `https://www.cascoronavirus.fr/stats/${this.selectedCountry.slug}` },
      // tslint:disable-next-line:max-line-length
      { name: 'og:title', content: `Tests de dépistage Coronavirus COVID-19 France` },
      // tslint:disable-next-line:max-line-length
      { name: 'og:description', content: `Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département` },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:card', content: 'summary' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:title', content: `Tests de dépistage Coronavirus COVID-19 France` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}
