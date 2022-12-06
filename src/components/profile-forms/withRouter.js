import {  useNavigate } from 'react-router-dom';

const withRouter = CreateProfile => ({ createProfile }) => {
  const navigate = useNavigate();
  
  return (
    <CreateProfile
      props = {createProfile}  
      navigate={navigate}
    />
  );
};

export default withRouter;