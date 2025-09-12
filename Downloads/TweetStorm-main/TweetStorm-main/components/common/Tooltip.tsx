import RcTooltip from 'rc-tooltip';

type TooltipProps = {
  children: JSX.Element;
  text: string;
  placement?: string;
};

function Tooltip({ children, placement = 'top', text }: TooltipProps) {
  return (
    <RcTooltip
      placement={placement}
      trigger={['click']}
      overlay={<span className='text-[12.5px]'>{text}</span>}
    >
      {children}
    </RcTooltip>
  );
}

export default Tooltip;
