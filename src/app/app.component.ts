import { ApplicationRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, filter, first, interval, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-pwa-test';
  

  constructor(){
    const swUpdate = inject(SwUpdate);
    const appRef = inject(ApplicationRef);

    swUpdate.versionUpdates
    .pipe(
      tap(evt => {
        console.log('tap event', evt)
      }),
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
    )
    .subscribe((evt) => {
      if(confirm('Có phiên bản mới. Vui lòng reload để làm mới')){
        window.location.reload();
      }
    });

    const appIsStable$ = appRef.isStable.pipe(first((isStable) => isStable === true));
    const everySixHours$ = interval(15 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await swUpdate.checkForUpdate();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });

    this.testFn();

  }

  testFn(){

    
    
    






    
  }
}
