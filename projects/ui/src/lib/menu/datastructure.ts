export interface MenuItem {
  id: number | string;
  title: string;
  description?: string;
  clickHandler?: (item: MenuItem) => void | Promise<void>;
  icon?: string;
  childs: MenuItem[];
}
