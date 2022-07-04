import { observer } from 'mobx-react-lite';
import React, { useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import { projectStore } from 'store';

const VideoFormPage = () => {

  const location = useLocation();

  useEffect(() => {
    projectStore.setNewProjectFormStep(2);
  }, [location]);

  return (
    <div>

    </div>
  );
};

export default observer(VideoFormPage);
