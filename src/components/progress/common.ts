import { type } from 'os';
import { useRef, useEffect } from 'react';
import { ProgressProps } from './interface';

export const defaultProps: Partial<ProgressProps> = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1,
};
// const point:number[] = ['1']
export const useTransitionDuration = (percentList: number[]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const paths = percentList.map(() => useRef<any>());
  const prevTimeStamp = useRef<any>(null);
  useEffect(() => {
    const now = Date.now()
    let update = false

    paths.forEach((path) => {
      if(!path.current) return;
      update = true
      const pathStyle = path.current.style
      pathStyle.transitionDuration = '.3s, .3s, .3s, .06s'
      if(prevTimeStamp.current && now - prevTimeStamp.current < 100) {
        pathStyle.transitionDuration = '0s, 0s';
      }
    })

    if(update) {
      prevTimeStamp.current = Date.now()
    }
  })
  return [paths];
};
