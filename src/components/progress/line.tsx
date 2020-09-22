import * as React from 'react'
import classNames from 'classnames'
import { useTransitionDuration, defaultProps } from "./common";
import { ProgressProps } from "./interface";

// line 组件
const Line:React.FC<ProgressProps> = ({
  className,
  percent,
  prefixCls,
  strokeColor,
  strokeLinecap,
  strokeWidth,
  style,
  trailColor,
  trailWidth,
  transition,
  ...restProps
}) => {
  // 去除 gap 属性
  delete restProps.gapPosition
  // 数组化 strokeColor, percent
  const percentList = Array.isArray(percent) ? percent! : [percent!]
  const strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor]


  const [paths] = useTransitionDuration(percentList)

  const center = strokeWidth! / 2
  const right = 100 - center
  const pathString = `M ${strokeLinecap === 'round' ? center : 0}, ${center}
    L${strokeLinecap === 'round' ? right : 100},${center}`
  const viewBoxString = `0 0 100 ${strokeWidth}`
  let stackPtg = 0

  return (
    <svg
      className={classNames(className,`${prefixCls}-line`)}
      style={style}
      {...restProps}
      viewBox={viewBoxString}
    >
      <path
        className={`${prefixCls}-line-trail`}
        d={pathString}
        strokeLinecap={strokeLinecap}
        stroke={trailColor}
        strokeWidth={trailWidth || strokeWidth}
        fillOpacity="0"
      >
        {
          percentList.map((ptg, index) => {
            const pathStyle= {
              strokeDasharray: `${ptg}px, 100px`,
              strokeDashoffset:`-${stackPtg}px`,
              transition: transition || 
                'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s ease linear'
            }
            const color = strokeColorList[index] || strokeColorList[strokeColorList.length -1]
            stackPtg += ptg
            return (
              <path
                className={`${prefixCls}-line-path`}
                d={pathString}
                strokeLinecap={strokeLinecap}
                stroke={color as string}
                strokeWidth={strokeWidth || trailWidth}
                style={pathStyle}
                fillOpacity='0'
                ref={paths[index]}
              />
            )
          })
        }
      </path>
    </svg>
  )
}

Line.defaultProps = defaultProps

Line.displayName = 'Line'

export default Line