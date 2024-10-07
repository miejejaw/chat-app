import PropTypes from "prop-types";

const CustomInputField = ({label, type, placeholder, register, errors}) => {
    const fieldId = label.toLowerCase().replace(' ', '_').trim();

    return (
        <div className="mb-4">
            <label htmlFor={fieldId} className="block text-gray-700 mb-2">
                {label}:
            </label>
            <input
                type={type}
                id={fieldId}
                className={`w-full px-3 py-2 border rounded-3xl ${errors ? 'border-red-500 focus:outline-none' : 'border-light-purple focus:outline-none focus:ring-light-purple focus:ring-1'}`}
                placeholder={placeholder}
                {...register}
            />
            {errors && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
    );
}

CustomInputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,  // Expect an object from react-hook-form
    errors: PropTypes.object
};

export default CustomInputField;
