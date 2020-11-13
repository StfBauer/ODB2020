import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
/** Required for theming */
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
  ISemanticColors
} from '@microsoft/sp-component-base';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GoodbyeIeWebPart.module.scss';
import * as strings from 'GoodbyeIeWebPartStrings';

export interface IGoodbyeIeWebPartProps {
  description: string;
}

export default class GoodbyeIeWebPart extends BaseClientSideWebPart<IGoodbyeIeWebPartProps> {

  /** Used for theming */
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  private setCSSVariables(theming: any) {

    // request all key defined in theming
    let themingKeys = Object.keys(theming);

    // if we have the key
    if (themingKeys !== null) {
      // loop over it
      themingKeys.forEach(key => {
        // add CSS variable to style property of the web part
        this.domElement.style.setProperty(`--${key}`, theming[key]);

      });

    }

  }

  protected onInit(): Promise<void> {

    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // If there is a theme variant
    if (this._themeVariant) {

      // we set transfer semanticColors into CSS variables
      this.setCSSVariables(this._themeVariant.semanticColors);

    } else if (window["__themeState__"].theme) {

      // FALLBACK TO App Page

      // we set transfer semanticColors into CSS variables
      this.setCSSVariables(window["__themeState__"].theme);

    }

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();

  }

  public render(): void {

    // teams context
    if (this.context.sdks.microsoftTeams) {
      this.domElement.classList.add('is-teams');
    } else {

      // is 100% full page
      if (document.getElementById("spPageCanvasContent") === null) {

        this.domElement.classList.add('is-fullpage');

      } else {

        this.domElement.classList.add('is-webpart');

      }

    }

    // add container class for web part
    this.domElement.classList.add(styles.goodbyeIe);

    // add content
    this.domElement.innerHTML = `
      <div class="gbie-wrapper">

        <header class="gbie-header"><span>HEADER</span></header>
      
        <aside class="gbie-sidebar"><span>Sidebar</span></aside>
      
        <main class="gbie-main">
          <span>
            Main Content
            <article class="gbie-article">
              Main Article
            </article>
          </span>
        </main>
      
      </div>

      `;
  }

  /**
 * Update the current theme variant reference and re-render.
 *
 * @param args The new theme
 */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {

    // assign new _themeVariant
    this._themeVariant = args.theme;
    this.setCSSVariables(this._themeVariant.semanticColors);
    // this.render();
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
