import { CoronavirusSheetTestComponent } from './containers/coronavirus-sheet-test/coronavirus-sheet-test.component';
import { CoronavirusSheetComponent } from './containers/coronavirus-sheet/coronavirus-sheet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoronavirusComponent } from './containers/coronavirus/coronavirus.component';
import { CoronavirusLinksComponent } from './containers/coronavirus-links/coronavirus-links.component';
import { CoronavirusLinksFranceComponent } from './containers/coronavirus-links-france/coronavirus-links-france.component';
import { CoronavirusLinksFranceTestComponent } from './containers/coronavirus-links-france-test/coronavirus-links-france-test.component';

export const coronavirusRoutes: Routes = [
  {
    path: '',
    component: CoronavirusComponent,
    children: [
      {
        path: '',
        component: CoronavirusSheetComponent
      },
      {
        path: 'stats/:country',
        component: CoronavirusSheetComponent
      },
      {
        path: 'stats/:country/region/:region',
        component: CoronavirusSheetComponent
      },
      {
        path: 'stats/:country/departement/:department',
        component: CoronavirusSheetComponent
      },
      {
        path: 'test-depistage/:country',
        component: CoronavirusSheetTestComponent
      },
      {
        path: 'test-depistage/:country/region/:region',
        component: CoronavirusSheetTestComponent
      },
      {
        path: 'test-depistage/:country/departement/:department',
        component: CoronavirusSheetTestComponent
      }
    ]
  },
  {
    component: CoronavirusLinksComponent,
    path: 'stats/liens/monde',
  },
  {
    component: CoronavirusLinksFranceComponent,
    path: 'stats/liens/france',
  },
  {
    component: CoronavirusLinksFranceTestComponent,
    path: 'stats/liens/test-depistage/france',
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(coronavirusRoutes)
  ]
})
export class CoronavirusRoutingModule {
}
