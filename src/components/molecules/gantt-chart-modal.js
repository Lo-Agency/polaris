import { Fragment, useRef, useEffect } from 'react'

const GanttModal = ({ onCancel, project }) => {
  const cancelButtonRef = useRef(null)
  useEffect(() => { });

  return (
    <Fragment>
      <div onClick={onCancel} as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}>
        <div className="flex justify-center min-h-screen p-4 items-center text-center sm:block sm:p-0">
          <div
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </div>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="p-5 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <table className='min-w-full divide-y divide-gray-500 m-8'>
                <tbody>
                  <tr>
                    <td>Type:</td>
                    <td>{project.projectType}</td>
                  </tr>
                  <tr>
                    <td>Learning:</td>
                    <td>{project.learningDay} days</td>
                  </tr>

                  <tr>
                    <td>Project:</td>
                    <td>{project.days} days</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn-form focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  ref={cancelButtonRef}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default GanttModal;