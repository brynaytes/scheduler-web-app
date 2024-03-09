import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { KeyManagementComponent } from './key-management/key-management.component';
import { ProfileComponent } from './profile/profile.component';
import { MeetingSetupComponent } from './meeting-setup/meeting-setup.component';
import { MeetingViewComponent } from './meeting-view/meeting-view.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';


const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home'
    },
    {
      path: 'about',
      component: AboutComponent,
      title: 'About'
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'login'
    },
    {
      path: 'meetingSetup',
      component: MeetingSetupComponent,
      title: 'meetingSetup'
    },    
    {
      path: 'meetingView',
      component: MeetingViewComponent,
      title: 'meetingView'
    },
    {
      path: 'timeEntry',
      component: KeyManagementComponent,
      title: 'timeEntry'
    },
    {
      path: 'profile',
      component: TimeEntryComponent,
      title: 'profile'
    }
  ];
  
  export default routeConfig;