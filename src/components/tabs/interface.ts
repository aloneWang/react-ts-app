import { TabPaneProps } from './TabPanelList/TabPane'

export type TabPosition = 'left' | 'right' | 'top' | 'bottom';

export interface Tab extends TabPaneProps {
    key: string;
    node: React.ReactElement
}
