import React, { useState } from 'react';

import {AppContainer} from './App.styles';
import NotificationForm from './components/NotificationForm/notification-form.component';
import Alert from './components/Alert/alert.component';
import CancelationForm from './components/CancelationForm/cancelation-form.component';

const App:React.FC = () => {
  const [alert, setAlert] = useState({
    shown: false,
    message: '',
    success: true
  })
  const [notificationFormShown, setNotificationFormShow] = useState(true)
  
  const toggleAlert = (message?:string, success?:boolean) => {
      if (message) {
        setAlert({
          shown:true,
          message: message,
          success: success? true : false
        })
      } else {
        setAlert({
          shown: false,
          message: '',
          success: true
        })
      }
  }

  const toggleNotificationForm = () => {
    setNotificationFormShow(c=>!c)
  }

  return (
    <AppContainer>
        <h1>Get notified each time ETH Gas price drops below certain threshold</h1>
        { 
          alert.shown?
          <Alert onClose={toggleAlert} message={alert.message} success={alert.success}/>
          :null
        }
        {
          notificationFormShown?
          <NotificationForm toggleAlert={toggleAlert}/>
          :
          <CancelationForm toggleAlert={toggleAlert} />
        }
        <span onClick={toggleNotificationForm}>{notificationFormShown? 'Want to cancel subscription?': 'Want to subscribe?'}</span>
    </AppContainer>
  );
}

export default App;
