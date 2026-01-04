import { Routes } from '@angular/router';
import { MasterComponent } from './master-componet/master.componet';
import { WelcomeComponent } from './master-componet/welcome.componet';
import { PetientRegistation } from './patient-registration/patient-registration.component';
export const routes: Routes = [

    {path:'',component:WelcomeComponent},
    {path:'welcome',component:WelcomeComponent},
    {path:'patient',component:PetientRegistation}
];
