import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';

import { activateAccount } from '../api';

const ActivateAccountPage = () => {

  const { uid, token } = useParams();
  const navigate = useNavigate();

  useAsync(async() => {
    try {
      await activateAccount(uid, token);
      navigate('/activation/success');
    }
    catch(error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      Происходит активация аккаунта. Подождите...
    </div>
  );
};

export default ActivateAccountPage;
