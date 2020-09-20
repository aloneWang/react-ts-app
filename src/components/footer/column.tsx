import * as React from 'react'
import classNames from 'classnames'

export interface FooterCoulmn {
  prefixCls?: string;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  items?: FooterColumnItem[];
  className?: string;
  style?: React.CSSProperties
}

export interface FooterColumnItem {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  url?: string;
  openExternal?: boolean;
  className?: string;
  style?: React.CSSProperties;
  LinkComponent?: React.ReactType;
}
const Column: React.FC<FooterCoulmn> = ({
  prefixCls,
  icon,
  title,
  items = [],
  className,
  style,
}) => (
  <div className = {classNames(`${prefixCls}-column`,className)} style={style}>
    {(title || icon) && (
      <h2>
        { icon && (<span className={`${prefixCls}-column-icon`}>{icon}</span>) }
        { title }
      </h2>
    )}
    {
      items.map( (item, i) => {
        const LinkComponent = item.LinkComponent || 'a'
        return (
          <div className={classNames(`${prefixCls}-item`, item.className)}
            style={style}
            key={i}
          >
            <LinkComponent
              href={item.url}
              to={typeof LinkComponent !== 'string' ? item.url : undefined}
              target={item.openExternal ? '_target' : undefined}
              rel={item.openExternal ? 'noopener noreferrer' : undefined}
            >
              {
                item.icon && (<span className={`${prefixCls}-item-icon`}>
                  {item.icon}
                </span>)
              }
              {item.title}
            </LinkComponent>
            {
              item.description && (
                <>
                  <span className={`${prefixCls}-item-separator`}>-</span>
                  <span className={`${prefixCls}-item-description`}>
                    {item.description}
                  </span>
                </>
              )
            }
          </div>
        ) 
      })
    }
  </div>
)
export default Column