import {LoadingBasic} from "../../css/loading.css";

const buttonBasicClass = `inline-flex rounded-md shadow-sm transition`;
const buttonSizeLarge = `px-4 py-2 text-base`;
const buttonSizeMedium = `px-4 py-1.5 text-base`;
const buttonSizeSmall = `px-2 py-1.5 text-sm`;
const buttonOutlineClass = `${buttonBasicClass} border-solid border hover:bg-orange-100 hover:border-orange-500`;
const buttonOutlinePrimaryClass = `${buttonBasicClass} border-solid border border-orange-600 hover:bg-orange-50`;

const buttonPrimaryClass = `${buttonBasicClass} bg-orange-500 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700`
const buttonDangerClass = `${buttonBasicClass} bg-rose-500 text-white hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700`
const buttonDisabledClass = `disabled:bg-gray-300 disabled:text-gray-400`;
const inputFieldClass = `relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-orange-500 active:border-orange dark:border-form-strokedark dark:bg-form-input`

const iconDeleteFile = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`;

const buttonDelete = `<button type="button" title="삭제" class="btn-delete text-rose-500">${iconDeleteFile}</button>`

const Loading = (className) => `<div id="el-${className}" class="${LoadingBasic} ${className}">
                        <div class="ripple"></div>
                    </div>`;

export {
    inputFieldClass,
    buttonBasicClass, buttonSizeLarge, buttonSizeMedium, buttonSizeSmall,
    buttonPrimaryClass, buttonDangerClass, buttonOutlinePrimaryClass,  buttonOutlineClass,
    iconDeleteFile, buttonDisabledClass, buttonDelete, Loading,
}
