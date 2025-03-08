# NgxTranslate

Esta é uma prova de conceito para internacionalização de aplicações em Angular usando ngx-translate.

1. Adicione os pacotes necessários:

```bash
npm install @ngx-translate/core @ngx-translate/http-loader @colsen1991/ngx-translate-extract-marker
```

2. Configure o módulo de tradução no app.config.ts:

```typescript
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, "./i18n/", ".json");

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        importProvidersFrom([
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
        ]),
    ],
};
```

3. Faça o setup da aplicação em app.component.ts:

```typescript
import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-root",
    imports: [RouterOutlet],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    translateService = inject(TranslateService);

    ngOnInit(): void {
        this.translateService.addLangs(["pt", "en"]);
        this.translateService.setDefaultLang("pt");
        this.translateService.use("pt");
    }
}
```

4. Aplique o pipe de tradução nos templates:

```html
<p>{{ "Olá mundo" | translate }}</p>
```

5. Configure os arquivos JSON de tradução, por exemplo:

- public/i18n/pt.json
- public/i18n/en.json

```json
{
    "Olá, mundo!": "Hello, world!"
}
```

6. Para trocar de idioma, basta chamar o método use do serviço de tradução:

```typescript
this.translateService.use("pt");
```
