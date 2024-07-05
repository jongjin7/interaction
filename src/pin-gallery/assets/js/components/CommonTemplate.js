import {LoadingBasic} from "../../css/loading.css";

const buttonBasicClass = `inline-flex rounded-md shadow-sm transition`;
const buttonSizeLarge = `px-4 py-2 text-base`;
const buttonSizeMedium = `px-4 py-1.5 text-base`;
const buttonSizeSmall = `px-2 py-1.5 text-sm`;
const buttonOutlineClass = `${buttonBasicClass} border-solid border hover:bg-orange-100 hover:border-orange-500`;
const buttonOutlinePrimaryClass = `${buttonBasicClass} border-solid border border-orange-600 hover:bg-orange-50`;

const buttonPrimaryClass = `${buttonBasicClass} bg-orange-500 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700`
const buttonDangerClass = `${buttonBasicClass} bg-rose-500 text-white hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700`


const loading = (className)=> `<div id="el-${className}" class="${LoadingBasic} ${className}">
                        <div class="ripple"></div>
                    </div>`;

export {
    buttonBasicClass, buttonSizeLarge, buttonSizeMedium, buttonSizeSmall,
    buttonPrimaryClass, buttonDangerClass, buttonOutlinePrimaryClass,  buttonOutlineClass,
    loading,
}
