import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'

type ToastProps = {
  typeToast: string
  nameImageToast: string
  titleToast: string
  customElementsToast: React.ReactNode
  widthImageToast?: number
  heightImageToast?: number
}

const ToastCustom = ({
  typeToast,
  nameImageToast,
  titleToast,
  customElementsToast,
  widthImageToast,
  heightImageToast,
}: ToastProps) => {
  return (
    <>
      {toast.custom(
        (t) => (
          <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'} ${
              typeToast === 'success'
                ? 'outline-[#58a360] shadow-[#58a360]'
                : 'outline-[#9e3339] shadow=[#9e3339]'
            }
          outline shadow-2xl max-w-md w-full bg-white shadow-sm rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-4">
                  <Image
                    title={`/${nameImageToast}`}
                    src={`/${nameImageToast}`}
                    alt={`/${nameImageToast}`}
                    width={widthImageToast || 70}
                    height={heightImageToast || 72}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-green-900">
                    {titleToast}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {customElementsToast}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: 5000,
          id: 'custom',
        },
      )}
    </>
  )
}

export default ToastCustom
