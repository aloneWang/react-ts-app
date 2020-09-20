import * as React from 'react'
import classNames from 'classnames'
import Column, { FooterCoulmn } from './column'


export interface FooterProps {
  prefixCls?: string;
  bottom?: React.ReactNode;
  maxColumnsPerRow?: number;
  columns?: FooterCoulmn[];
  theme?: 'dark' | 'light';
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  columnLayout?: 'space-around' | 'space-between'
}

const Footer: React.FC<FooterProps> = ({
  prefixCls = 'rc-footer',
  className,
  style,
  bottom,
  columns,
  theme = 'dark',
  maxColumnsPerRow,
  backgroundColor,
  columnLayout,
  ...restProps
}) => {
  const footerClassName = classNames(`${prefixCls}`, className, {
    [`${prefixCls}-${theme}`]: !!theme
  })
  const shoulWrap = typeof maxColumnsPerRow == 'number' && maxColumnsPerRow > 0

  return (
    <footer
      {...restProps}
      className= {footerClassName}
      style={{
        ...style,
        backgroundColor,
      }}
    >
      <section className={`${prefixCls}-container`}>
        {
          columns && columns.length > 0 && (
            <section
              className={`${prefixCls}-columns`}
              style={{
                justifyContent: columnLayout,
                flexWrap: shoulWrap ? 'wrap' : undefined
              }}
            >
              {
                columns.map( ({
                  title,
                  icon,
                  style: columnStyle,
                  className: columnClassName,
                  items = [], 
                }, i) => {
                  const styleObject = {...columnStyle} as React.CSSProperties
                  if(shoulWrap) {
                    styleObject.flex = `0 0 ${100 / (maxColumnsPerRow! + 1) + 0.1}%`
                  }
                  return (
                    <Column
                      key={i}
                      prefixCls={prefixCls}
                      title={title}
                      icon={icon}
                      items={items}
                      style={styleObject}
                      className={columnClassName}
                    />
                  )
                })
              }
            </section>
          )
        }
        {
          bottom && (
            <section className={`${prefixCls}-bottom`}>
              <div className={`${prefixCls}-bottom-container`}>{bottom}</div>
            </section>
          )
        }

      </section>
    </footer>
  )
}