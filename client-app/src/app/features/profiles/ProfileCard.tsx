import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../models/profile";

const ProfileCard: React.FC<{ profile: Profile }> = (props) => {
  return (
    <Card as={Link} to={`/profiles/${props.profile.username}`}>
      <Image src={props.profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{props.profile.displayName}</Card.Header>
        <Card.Description>Bio Goes Here</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        20 followers
      </Card.Content>
    </Card>
  );
};
export default observer(ProfileCard);
