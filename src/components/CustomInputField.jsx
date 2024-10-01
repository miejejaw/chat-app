import PropTypes from "prop-types";

const CustomInputField = ({label, type, placeholder, register, errors}) => {
    const fieldId = label.toLowerCase().replace(' ', '_').trim();
    return (
        <div className="mb-4">
            <label htmlFor={label.toLowerCase().replace(' ', '-').trim()} className="block text-gray-700 mb-2">
                {label}:
            </label>
            <input
                type={type}
                id={fieldId}
                className={`w-full px-3 py-2 border ${errors ? 'border-red-500' : 'border-light-purple'} rounded-3xl focus:outline-none focus:ring-1 focus:ring-light-purple`}
                placeholder={placeholder}
                {...register(fieldId, {required: true})}
            />
            {errors && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
    );
}

CustomInputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default CustomInputField;