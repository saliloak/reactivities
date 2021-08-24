import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { format } from "date-fns";
import { Activity } from "../../../models/activity";
import { useStore } from "../../../stores/store";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ActivityDetailedHeader: React.FC<{ activity: Activity }> = (props) => {
  const {
    activityStore: { updateAttendance, loading, cancelActivityToggle },
  } = useStore();

  let content = props.activity.isHost ? (
    <>
      <Button
        color={props.activity.isCancelled ? "green" : "red"}
        floated="left"
        basic
        content={
          props.activity.isCancelled
            ? "Re-activate Activity"
            : "Cancel Activity"
        }
        onClick={cancelActivityToggle}
        loading={loading}
      />
      <Button
        disabled={props.activity.isCancelled}
        as={Link}
        to={`/manage/${props.activity.id}`}
        color="orange"
        floated="right"
      >
        Manage Event
      </Button>
    </>
  ) : props.activity.isGoing ? (
    <Button loading={loading} onClick={updateAttendance}>
      Cancel attendance
    </Button>
  ) : (
    <Button
      disabled={props.activity.isCancelled}
      loading={loading}
      onClick={updateAttendance}
      color="teal"
    >
      Join Activity
    </Button>
  );

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {props.activity.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            color="red"
            ribbon
            content="Cancelled"
          />
        )}
        <Image
          src={`/assets/categoryImages/${props.activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={props.activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(props.activity.date!, "dd MMM yyyy")}</p>
                <p>
                  Hosted by&nbsp;
                  <strong>
                    <Link to={`/profiles/${props.activity.host?.username}`}>
                      {props.activity.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {content}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
