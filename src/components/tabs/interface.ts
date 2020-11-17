import { type } from 'os';
import { TabPaneProps } from './TabPanelList/TabPane'

export type TabPosition = 'left' | 'right' | 'top' | 'bottom';

export interface TabSize {
    width?: number;
    height?: number;
    top?: number;
    left?: number;
}
export type TabSizeMap = Map<React.Key,TabSize> 

export interface TabOffset extends TabSizeMap {
    top: number;
}

export type TabOffsetMap = Map<React.Key,TabOffset>

export interface AnimatedConfig {
    inkBar: boolean;
}

export type renderTabBar = (props: any, defaultComponent: React.ComponentType<typeof props>)=> React.ReactElement

export interface Tab extends TabPaneProps {
    key: string;
    node: React.ReactElement
}
