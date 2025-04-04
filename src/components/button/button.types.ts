export interface IButton {
    type: 'progress' | 'main',
    onClick: () => void,
    classNames?: string,
    text: string
}