import { useParams } from 'react-router-dom';

function PageUseParam() {
  const { id } = useParams();

  return <div>PageUseParam:{id}</div>;
}

export default PageUseParam;
