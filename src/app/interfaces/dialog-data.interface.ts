import {TemplateRef} from "@angular/core";

export interface DialogDataInterface {
  title?: string;
  contentText?: string;
  contentTemplate?: TemplateRef<any>;
  templateContext?: any;
}
