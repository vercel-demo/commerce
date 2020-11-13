import { FC } from 'react'
import Portal from '@reach/portal'
import s from './Modal.module.css'
import { Cross } from '@components/icons'

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({ children, open = false, onClose, ...props }) => {
  return open ? (
    <Portal>
      <div className={s.root}>
        <div className={s.modal}>
          <div className="h-7 flex items-center justify-end w-full">
            <button
              onClick={() => onClose()}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  ) : null
}

export default Modal
