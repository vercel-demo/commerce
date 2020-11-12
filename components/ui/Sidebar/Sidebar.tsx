import s from './Sidebar.module.css'
import Portal from '@reach/portal'
import { FC, useRef } from 'react'
import { FocusScope } from '@react-aria/focus'
import { useOverlay, OverlayContainer } from '@react-aria/overlays'

interface Props {
  children: any
  open: boolean
  onClose: () => void
}

const Sidebar: FC<Props> = ({ children, open = false, onClose }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { overlayProps } = useOverlay(
    {
      isOpen: open,
      isDismissable: true,
      onClose: onClose,
    },
    ref
  )

  return (
    <Portal>
      {open ? (
        <OverlayContainer>
          <FocusScope contain restoreFocus autoFocus>
            <div className={s.root}>
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                  onClick={onClose}
                />
                <section
                  className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none"
                  {...overlayProps}
                  ref={ref}
                >
                  <div className="h-full md:w-screen md:max-w-md">
                    <div className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto">
                      {children}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </FocusScope>
        </OverlayContainer>
      ) : null}
    </Portal>
  )
}

export default Sidebar
