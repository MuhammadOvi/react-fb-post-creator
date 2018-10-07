import React, { Component } from 'react';
import FBPost from './FBPost';

import {
  Upload,
  Icon,
  Divider,
  Input,
  Select,
  TimePicker,
  Button,
  InputNumber,
  Checkbox,
} from 'antd';

import './App.css';

const { Option } = Select;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avtars: [],
      images: [],
      includeLike: false,
      includeLove: false,
      includeHaha: false,
      includeWow: false,
      includeSad: false,
      includeAngry: false,
      editorShown: true,
    };
  }

  toggleEditor = () => {
    let { editorShown } = this.state;
    this.setState({ editorShown: !editorShown });
  };

  uploadAvtar = ({ fileList }) => this.setState({ avtars: fileList });

  setTime = (time, timeString) => {
    this.setState({ time: timeString });
  };

  setPrivacy = value => {
    this.setState({ privacy: value });
  };

  uploadImages = ({ fileList }) => {
    const images = fileList.map(file => {
      return file.thumbUrl;
    });
    this.setState({ images });
  };

  includeLike = () => {
    let { includeLike } = this.state;
    this.setState({ includeLike: !includeLike });
  };

  includeLove = () => {
    let { includeLove } = this.state;
    this.setState({ includeLove: !includeLove });
  };

  includeHaha = () => {
    let { includeHaha } = this.state;
    this.setState({ includeHaha: !includeHaha });
  };

  includeWow = () => {
    let { includeWow } = this.state;
    this.setState({ includeWow: !includeWow });
  };

  includeSad = () => {
    let { includeSad } = this.state;
    this.setState({ includeSad: !includeSad });
  };

  includeAngry = () => {
    let { includeAngry } = this.state;
    this.setState({ includeAngry: !includeAngry });
  };

  render() {
    const {
      avtars,
      name,
      caption,
      time,
      privacy,
      likes,
      images,
      editorShown,
    } = this.state;
    let {
      includeLike,
      includeLove,
      includeHaha,
      includeWow,
      includeSad,
      includeAngry,
    } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload Avtar</div>
      </div>
    );

    return (
      <div className="App">
        <Button onClick={this.toggleEditor} className="editor-hide-button">
          {editorShown ? 'Hide Editor' : 'Show Editor'}
        </Button>

        {editorShown && (
          <div className="editor">
            <div className="editor_avtar">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                onPreview={() => {}}
                accept="image/*"
                onChange={this.uploadAvtar}
              >
                {avtars.length >= 1 ? null : uploadButton}
              </Upload>
            </div>

            <div className="editor_name">
              <Input
                placeholder="Your Name"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>

            <div className="editor_time_privacy">
              <TimePicker
                onChange={this.setTime}
                use12Hours
                format="h:mm a"
                className="select-time"
                placeholder="Select Time"
              />

              <Select
                defaultValue="Privacy"
                className="editor-privacy"
                onChange={this.setPrivacy}
              >
                <Option value="Privacy" disabled>
                  Privacy
                </Option>
                <Option value="public">Public</Option>
                <Option value="friends">Friends</Option>
              </Select>
            </div>

            <div className="editor_caption">
              <Input.TextArea
                rows={1}
                placeholder="Some Caption"
                onChange={e => this.setState({ caption: e.target.value })}
              />
            </div>

            <Divider />

            <p>
              <b>Upload Pictures:</b> &nbsp; Upload Multiples by clicking CTRL
              ;)
            </p>
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture"
              multiple
              onPreview={() => {}}
              accept="image/*"
              onChange={this.uploadImages}
            >
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>

            <Divider />

            <InputNumber
              style={{ width: '100%' }}
              placeholder="Initial Likes"
              onChange={value => this.setState({ likes: value })}
            />

            <br />
            <br />
            <b>Includes:</b>
            <br />
            <Checkbox
              onChange={this.includeLike}
              style={{ width: 'calc(33% - 10px)', marginLeft: 10 }}
            >
              Likes
            </Checkbox>
            <Checkbox
              onChange={this.includeLove}
              style={{ width: 'calc(33% - 10px)', marginLeft: 10 }}
            >
              Love
            </Checkbox>
            <Checkbox
              onChange={this.includeHaha}
              style={{ width: 'calc(33% - 10px)', marginLeft: 10 }}
            >
              Haha
            </Checkbox>
            <Checkbox
              onChange={this.includeWow}
              style={{ width: 'calc(33% - 10px)', marginLeft: 10 }}
            >
              WoW
            </Checkbox>
            <Checkbox
              onChange={this.includeSad}
              style={{ width: 'calc(33% - 10px)', marginLeft: 10 }}
            >
              Sad
            </Checkbox>
            <Checkbox
              onChange={this.includeAngry}
              style={{ width: 'calc(33% - 10px)', marginLeft: 10 }}
            >
              Angry
            </Checkbox>
          </div>
        )}

        <div className="result">
          <FBPost
            avtar={avtars[0] ? avtars[0].thumbUrl : false}
            name={name}
            time={time}
            privacy={privacy}
            caption={caption}
            images={images}
            likes={likes}
            includeLike={includeLike}
            includeLove={includeLove}
            includeHaha={includeHaha}
            includeWow={includeWow}
            includeSad={includeSad}
            includeAngry={includeAngry}
          />
        </div>
        <div style={{ height: 200, width: '100%' }}>&nbsp;</div>
      </div>
    );
  }
}

export default App;
