export interface CmsComponentData{
    [key:string]: string;

}
export interface CmsComponentConfig {
  uid: string;
  type: string;
  config: CmsComponentData;
}

export interface CmsSlotConfig {
  id: string;
  components: CmsComponentConfig[];
}

export interface CmsPageLayout {
  pageId: string;
  slots: CmsSlotConfig[];
}