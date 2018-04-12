import { Injectable } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class IconService {
  private registry: MatIconRegistry;
  private iconNameTypeMap: Map<string, string>;

  constructor(private sanitizer: DomSanitizer) {
    this.iconNameTypeMap = new Map();
  }

  init(registry: MatIconRegistry) {
    this.registry = registry;

    this.addSvgIcon('moon');
    this.addSvgIcon('vehicle');
    this.addSvgIcon('team-logo');
    console.log('done');
  }

  private addSvgIcon(name: string): void {
    this.registry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(`./assets/icons/${name}.svg`));
    this.iconNameTypeMap.set(name, 'svg');
  }

  private addImageIcon(name: string): void {
    this.iconNameTypeMap.set(name, 'image');
  }

  public getIconType(name: string): string {
    return this.iconNameTypeMap.get(name);
  }
}
