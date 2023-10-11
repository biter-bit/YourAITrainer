import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import React from "react";
import Diary from "../Diary";

function CheckAuthComponent({
      checkAuthentication,
      setModalWindow,
      modalActive,
      exitAccount
    }) {
      const [isAuthenticated, setIsAuthenticated] = useState(null);

      useEffect(() => {
        async function checkAuthentications() {
          const isAuthenticated = await checkAuthentication();
          setIsAuthenticated(isAuthenticated);
        }

        checkAuthentications();
      }, [checkAuthentication]);

      if (isAuthenticated === null) {
        // Во время проверки авторизации показать загрузочное состояние или что-то подобное
        return <div>Loading...</div>;
      } else if (isAuthenticated) {
        return (
          <Diary
            setModalWindow={setModalWindow}
            modalActive={modalActive}
            exitAccount={exitAccount}
          />
        );
      } else {
        // Если пользователь не авторизован, выполнить редирект
        return <Navigate to="/?showModal=true" />;
      }
    }

export default CheckAuthComponent;