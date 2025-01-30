import { LoadingBasic as LoadingStyle } from '../../css/loading.css';

// eslint-disable-next-line import/prefer-default-export
export const LoadingBasic = (className) => `
    <div id="el-${className}" class="${LoadingStyle} ${className}">
        <div class="ripple"></div>
    </div>`;
