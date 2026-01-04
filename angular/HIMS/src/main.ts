import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { MasterComponent } from './master-componet/master.componet';

bootstrapApplication(MasterComponent, appConfig)
  .catch((err) => console.error(err));
