import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    translateService = inject(TranslateService);

    ngOnInit(): void {
        this.translateService.addLangs(['pt', 'en']);
        this.translateService.setDefaultLang('en');
        this.translateService.use('en');
    }

    changeLang(lang: string): void {
        this.translateService.use(lang);
    }
}
