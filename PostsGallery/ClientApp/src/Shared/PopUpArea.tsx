import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';


import classNames from 'classnames';
import { YuMath } from './Models/YuMath';
import { InterruptTask } from './Functions/InterruptTask';
import { sleep } from './Functions/Sleep';


interface PopUpAreaProps {
    priority: 'up' | 'bottom' | 'left' | 'right';
    showType: 'click' | 'hover' | 'always';
    injected: JSX.Element;

    className?: string;
    align?: number;
}

interface PopUpAreaState {
    show: boolean;
    injectXoffset: number;
    injectYoffset: number;
}

export class PopUpArea extends React.Component<PopUpAreaProps, PopUpAreaState> {
    rootDivRef: React.RefObject<HTMLDivElement> = React.createRef();
    childDivRef: React.RefObject<HTMLDivElement> = React.createRef();
    injectedDivRef: React.RefObject<HTMLDivElement> = React.createRef();
    rootObserverResize: ResizeObserver | undefined;
    injectObserverResize: ResizeObserver | undefined;
    isMount = false;

    constructor(props: PopUpAreaProps) {
        super(props);
        this.state = { show: false, injectXoffset: 0, injectYoffset: 0 }
        this.calculatePosition = this.calculatePosition.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.windowClick = this.windowClick.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        this.isMount = true;
        this.rootObserverResize = new ResizeObserver(this.calculatePosition);
        this.injectObserverResize = new ResizeObserver(this.calculatePosition);

        if (this.rootDivRef.current)
            this.rootObserverResize.observe(this.rootDivRef.current);
        if (this.injectedDivRef.current)
            this.rootObserverResize.observe(this.injectedDivRef.current);


        window.addEventListener("resize", this.calculatePosition);
        window.addEventListener("mousedown", this.windowClick);
        this.childDivRef.current?.addEventListener('click', this.buttonClick);
        this.rootDivRef.current?.addEventListener('mouseenter', this.show);
        this.rootDivRef.current?.addEventListener('mouseleave', this.close);
        this.calculatePosition();
    }

    componentWillUnmount() {
        this.isMount = false;
        this.rootObserverResize?.disconnect();
        this.injectObserverResize?.disconnect();
        window.removeEventListener("resize", this.calculatePosition);
        window.removeEventListener("mousedown", this.windowClick);
        this.childDivRef.current?.removeEventListener('click', this.buttonClick);
        this.rootDivRef.current?.removeEventListener('mouseenter', this.show);
        this.rootDivRef.current?.removeEventListener('mouseleave', this.close);
    }

    buttonClick() {
        if (this.isMount && this.props.showType === 'click') {
            this.setState({ show: !this.state.show });
            this.calculatePosition();
        }
    }
    CloseTask = new InterruptTask();

    show() {
        if (this.isMount && this.props.showType === 'hover') {
            this.setState({ show: true });
            this.calculatePosition();
            this.CloseTask.Abort();
        }
    }

    async close(event: MouseEvent) {
        if (this.isMount && this.props.showType === 'hover') {
            const id = this.CloseTask.GetId();
            await sleep(250);
            if (this.CloseTask.CheckTask(id))
                this.setState({ show: false });
        }
    }

    windowClick(event: MouseEvent) {
        if (this.isMount && this.rootDivRef.current &&
            !this.rootDivRef.current.contains(event.target as Element) &&
            this.rootDivRef.current !== event.target) {
            this.setState({ show: false });
        }
    }

    componentDidUpdate() {
        this.calculatePosition();
    }

    calculatePosition() {
        if (this.isMount && this.injectedDivRef.current && this.rootDivRef.current) {
            let translateX = 0;
            let translateY = 0;
            const rootWidth = this.rootDivRef.current.clientWidth;
            const rootHeight = this.rootDivRef.current.clientHeight;
            const box = this.rootDivRef.current.getBoundingClientRect();
            const rootXStart = box.x;
            const rootYStart = box.y;
            const rootYEnd = rootYStart + rootHeight;
            const injectWidth = this.injectedDivRef.current.clientWidth;
            const injectHeight = this.injectedDivRef.current.clientHeight;
            let alignOffset = 0;

            if (this.props.priority === 'bottom' || this.props.priority === 'up') {
                if (this.props.align) {
                    alignOffset = YuMath.Lerp(0, injectWidth - rootWidth, this.props.align);
                    translateX -= alignOffset;
                }
                if (this.props.priority === 'up' && rootYStart - injectHeight > 5)
                    translateY = - rootHeight - injectHeight;

                if (window.innerHeight - (rootYEnd + injectHeight) < 5)
                    translateY = - rootHeight - injectHeight;

                const freeRightSpace = window.innerWidth - (rootXStart + injectWidth);
                if (freeRightSpace + alignOffset < 5)
                    translateX = freeRightSpace - 5;

                if (rootXStart - alignOffset < 5)
                    translateX = -rootXStart + 5;

                if (translateX < rootWidth - injectWidth)
                    translateX = rootWidth - injectWidth;
                if (translateX > 0)
                    translateX = 0;
            }

            if (this.props.priority === 'left' || this.props.priority === 'right') {
                translateY = -rootHeight;
                translateX = rootWidth;
                if (this.props.align) {
                    alignOffset = YuMath.Lerp(0, injectHeight - rootHeight, this.props.align);
                    translateY -= alignOffset;
                }

                if (this.props.priority === 'left' && rootXStart - injectWidth > 5)
                    translateX = -injectWidth;

                if (window.innerWidth - (rootXStart + rootWidth + injectWidth) < 5)
                    translateX = -injectWidth;

                const freeYBottomSpace = window.innerHeight - (rootYStart + injectHeight);
                if (freeYBottomSpace + alignOffset < 5)
                    translateY = freeYBottomSpace - rootHeight - 5;

                if (rootYStart - alignOffset < 5)
                    translateY = -rootYStart - rootHeight + 5;

                if (translateY > -rootHeight)
                    translateY = -rootHeight;

                if (translateY < -injectHeight)
                    translateY = -injectHeight;
            }

            if (this.state.injectXoffset !== translateX || this.state.injectYoffset !== translateY)
                this.setState({ injectXoffset: translateX, injectYoffset: translateY });
        }
    }

    render() {

        const translate = 'translate(' + this.state.injectXoffset + 'px, ' + this.state.injectYoffset + 'px)';
        return (
            <div
                ref={this.rootDivRef}
                style={{
                    position: 'relative'
                }}
                className={classNames(this.props.className)}
            >
                <div ref={this.childDivRef}>{this.props.children}</div>
                {(this.state.show || this.props.showType === 'always') &&
                    <div
                        ref={this.injectedDivRef}
                        style={{
                            position: 'absolute',
                            transform: translate,
                            zIndex: 5
                        }}
                    >
                        {this.props.injected}
                    </div>
                }
            </div>
        );
    }
}


//class MountCallbackComponent extends React.Component<MountCallbackComponentProps> {
//	componentDidMount() {
//		this.props.mountCallback();
//	}
//	render() {
//		return this.props.children;
//	}
//}
