import { LoadingBasic as LoadingStyle } from '../../css/loading.css';
export const LoadingBasic = (className) => `
    <div id="el-${className}" class="${LoadingStyle} ${className}">
        <div class="ripple"></div>
    </div>`;
