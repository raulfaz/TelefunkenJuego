import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { SelectPlayersComponent } from './select-players/select-players.component';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { GameComponent } from './game/game.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-room', component: CreateRoomComponent },
  { path: 'join-room', component: JoinRoomComponent },
  { path: 'select-players', component: SelectPlayersComponent },
  { path: 'select-avatar', component: SelectAvatarComponent },
  { path: 'game', component: GameComponent },
  { path: 'results', component: ResultsComponent },
];
