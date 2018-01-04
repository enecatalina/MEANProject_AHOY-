import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './home/login/login.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { ChannelComponent } from './channel/channel.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full'
  //   component: AppComponent,
  // },
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegistrationComponent}
    ]
  },
  // {
  //   path: 'createuser',
  //   pathMatch: 'full',
  //   component: RegistrationComponent,
  //   children: [],
  // },
  {
    path: 'Team',
    pathMatch: 'full',
    component: TeamsComponent,
  },
  {
    path: 'chat',
    pathMatch: 'full',
    component: ChatComponent,
    children: [],
  },
  // {
  //   path: '**', //this was preventing my form from channel component from displaying
  //   pathMatch: 'full',
  //   component: PagenotfoundComponent,
  //   children: [],
  // },
  {
    path: 'createchannel',
    pathMatch: 'full',
    component: ChannelComponent,
  },
  {
    path: 'editProfile',
    pathMatch: 'full',
    component: EditProfileComponent,
  },
  {
    path: 'logout',
    pathMatch: 'full',
    component: LoginComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
