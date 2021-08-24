import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loading from "../../../Layout/Loading";
import { useStore } from "../../../stores/store";
import ActivityFilter from "./ActivityFilter";
import ActivityList from "./ActivityList";

const ActivityDashboard: React.FC = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;
  useEffect(() => {
    if (activityRegistry.size <= 1) {
      loadActivities();
    }
  }, [activityRegistry, loadActivities]);

  if (activityStore.loadingInitial) {
    return <Loading content="Loading Activities" />;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
