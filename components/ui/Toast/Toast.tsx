import cn from 'classnames'
import { FC, useRef, useEffect, useCallback } from 'react'
import s from './Toast.module.css'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useOverlay, useModal, OverlayContainer } from '@react-aria/overlays'

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
}

const Toast: FC<Props> = ({
  className,
  children,
  open = false,
  onClose,
  ...props
}) => {
  const rootClassName = cn(s.root, className)
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { modalProps } = useModal()
  let { dialogProps } = useDialog({}, ref)
  let { overlayProps } = useOverlay(
    {
      isOpen: open,
      isDismissable: true,
      onClose: onClose,
      ...props,
    },
    ref
  )

  // useEffect(() => {
  //   setTimeout(() => {
  //     useCallback(onClose, [])
  //   }, 400)
  // })

  return (
    open && (
      <OverlayContainer>
        <FocusScope contain restoreFocus autoFocus>
          <div className={rootClassName}>
            <div
              className={s.toast}
              {...overlayProps}
              {...dialogProps}
              {...modalProps}
              ref={ref}
            >
              {children}
            </div>
          </div>
        </FocusScope>
      </OverlayContainer>
    )
  )
}

export default Toast
