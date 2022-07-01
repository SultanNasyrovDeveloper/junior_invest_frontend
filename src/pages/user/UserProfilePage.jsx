import React from 'react';

import { useTitle } from 'react-use';

const UserProfilePage = () => {
  useTitle('Профиль пользователя');

  return (
    <div>
      User Profile Page
    </div>
  );
};

export default UserProfilePage;
