import { SideMenu } from '../side-menu.component';

export interface BlocGlobalApi extends Window {
    showSideMenu?: (menu?: SideMenu) => void;
    hideSideMenu?: (menu?: SideMenu) => void;
}