import React, { useId } from 'react'
// we have to pass the reference this is the syntax for using forwardRef we are passing the ref to the input filed
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();

    return <div className='w-full'>
        {
            label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>
        }
        <input
            type={type}
            className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none border border-gray-200 w-full`}
            ref={ref}
            {...props}
            id={id}

        />
    </div>
})

export default Input
