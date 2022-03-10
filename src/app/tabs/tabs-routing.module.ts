import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/members/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'timer',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../timer/timer.module').then(m => m.TimerPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'songs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../songs/songs.module').then(m => m.SongsPageModule)
          }
        ]
      },
      {
        path: 'authors',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../authors/authors.module').then(m => m.AuthorsPageModule)
          }
        ]
      },
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
