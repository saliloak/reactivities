import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import TestErrors from "../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../features/errors/NotFound";
import ServerError from "../features/errors/ServerError";
import LoginForm from "../features/users/LoginForm";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import Loading from "./Loading";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApploaded());
    } else {
      commonStore.setApploaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <Loading content="Loading app..." />;
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path="/activities" exact>
                  <ActivityDashboard />
                </Route>
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                >
                  <ActivityForm />
                </Route>
                <Route path="/activities/:id">
                  <ActivityDetails />
                </Route>
                <Route path="/errors">
                  <TestErrors />
                </Route>
                <Route path="/server-error">
                  <ServerError />
                </Route>
                <Route path="/login">
                  <LoginForm />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Container>
          </>
        )}
      ></Route>
    </>
  );
}

export default observer(App);
