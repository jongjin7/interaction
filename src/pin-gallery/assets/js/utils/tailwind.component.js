const buttonBasicClass = `inline-flex rounded-md shadow-sm transition`;
const buttonSizeLarge = `px-4 py-2 text-base`;
const buttonSizeMedium = `px-4 py-1.5 text-base`;
const buttonSizeSmall = `px-2 py-1.5 text-sm`;
const buttonOutlineClass = `${buttonBasicClass} border-solid border hover:bg-orange-100 hover:border-orange-500`;
const buttonOutlinePrimaryClass = `${buttonBasicClass} border-solid border border-orange-600 hover:bg-orange-50`;

const buttonPrimaryClass = `${buttonBasicClass} bg-orange-500 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700`;
const buttonDangerClass = `${buttonBasicClass} bg-rose-500 text-white hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700`;
const buttonDisabledClass = `disabled:bg-gray-300 disabled:text-gray-400`;
const inputFieldClass = `relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-orange-500 active:border-orange dark:border-form-strokedark dark:bg-form-input`;

export {
  inputFieldClass,
  buttonBasicClass,
  buttonSizeLarge,
  buttonSizeMedium,
  buttonSizeSmall,
  buttonPrimaryClass,
  buttonDangerClass,
  buttonOutlinePrimaryClass,
  buttonOutlineClass,
  buttonDisabledClass,
};
