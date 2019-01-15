import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

export default class Notification extends Component {
  createNotification = type => {
    return () => {
      switch (type) {
        case "success":
          NotificationManager.success("Success message", "Title here");
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };
  render() {
    return (
      <React.Fragment>
        <p>nice</p>
      </React.Fragment>
    );
  }
}
