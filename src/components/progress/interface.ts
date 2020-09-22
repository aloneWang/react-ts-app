import * as React from 'react'

// 定义 progress props 类型
export interface ProgressProps {
  strokeWidth?: number;
  strokeColor?: StrokeColorType;
  trailWidth?: number;
  trailColor?: string;
  strokeLinecap?: StrokeLinecapType;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  percent?: number | number[];
  gapDegree?: number;
  gapPosition?: GapPositionType;
  transition?: string;
}

export type StrokeColorType = string | string[] | object

export type GapPositionType = 'top' | 'right' | 'bottom' | 'left'

export type StrokeLinecapType = 'round' | 'butt' | 'square'