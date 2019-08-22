import React, { Component } from 'react';
import { View } from 'react-native';
import config from './../config';

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frameHeight: 400,
      currentTaskId: 0,
    };
  }

  componentDidMount() {
    const receiveMessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (event.origin === config.checkWebUrl) {
        const data = JSON.parse(event.data);
        if (data.height) {
          const frameHeight = data.height;
          this.setState({ frameHeight });
        } else if (data.task || data.task === 0) {
          window.parent.postMessage(JSON.stringify({ task: data.task }), '*');
          const currentTaskId = data.task;
          this.setState({ currentTaskId });
        }
      }

      if (data.selectedText) {
        document.getElementById('check-web-frame').contentWindow.postMessage(event.data, config.checkWebUrl);
      }
    }
    window.addEventListener('message', receiveMessage, false);
  }

  render() {
    const pm = this.props.projectMedia;

    return (
      <View id="update">
        <iframe
          id="check-web-frame"
          src={`${config.checkWebUrl}/${pm.project.team.slug}/project/${pm.project_id}/media/${pm.dbid}/tasks`}
          frameborder="none"
          style={{
            border: 0,
            boxSizing: 'border-box',
            minHeight: 400,
            height: this.state.frameHeight,
          }}
        />
      </View>
    );
  }
}

export default Update;