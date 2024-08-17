import { LoadingBasic as LoadingStyle } from '@/styles/loading.css';

const Loading = ({ name }) => {
  console.log('Loading?', name);
  return (
    <div id={`el-${name}`} className={`${LoadingStyle} ${name}`}>
      <div className="ripple"></div>
    </div>
  );
};
export default Loading;
