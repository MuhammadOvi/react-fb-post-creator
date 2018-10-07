import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Modal from './Modal';

class Images extends Component {
  static defaultProps = {
    beautify: false,
    countFrom: 5,
    hideOverlay: false,
    images: [],
    onClickEach: null,
    overlayBackgroundColor: '#222222',
    renderOverlay: () => 'Preview Image',
    upperHeight: 65,
    width: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      countFrom:
        props.countFrom > 0 && props.countFrom < 5 ? props.countFrom : 5,
      modal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);

    if (props.countFrom <= 0 || props.countFrom > 5) {
      console.warn('countFrom is limited to 5!');
    }
  }

  onClose() {
    this.setState({ modal: false });
  }

  openModal(index) {
    const { onClickEach, images } = this.props;

    if (onClickEach) {
      return onClickEach({ index, src: images[index] });
    }

    this.setState({ index, modal: true });
  }

  renderOne() {
    const { images, beautify, upperHeight } = this.props;
    const { countFrom } = this.state;
    const height = images.length === 1 ? '100%' : `${upperHeight}%`;

    const overlay =
      images.length > countFrom && countFrom === 1
        ? this.renderCountOverlay(true)
        : this.renderOverlay();

    return (
      <Grid style={{ width: '100%', height }}>
        <Row style={{ width: '100%', height: '100%' }} key={Math.random()}>
          <Col
            key={Math.random()}
            xs={12}
            md={12}
            className={`border background ${beautify && 'beautify'}`}
            onClick={this.openModal.bind(this, 0)}
            style={{ background: `url(${images[0]})`, height: '100%' }}
          >
            {overlay}
          </Col>
        </Row>
      </Grid>
    );
  }

  renderTwo() {
    const { images, beautify, upperHeight } = this.props;
    const { countFrom } = this.state;
    const overlay =
      images.length > countFrom && [2, 3].includes(+countFrom)
        ? this.renderCountOverlay(true)
        : this.renderOverlay();
    const height =
      images.length === 2
        ? '100%'
        : images.length === 3
          ? `${100 - upperHeight}%`
          : `${upperHeight}%`;
    const conditionalRender =
      [3, 4].includes(images.length) ||
      (images.length > +countFrom && [3, 4].includes(+countFrom));

    return (
      <Grid style={{ width: '100%', height }}>
        <Row style={{ width: '100%', height: '100%' }} key={Math.random()}>
          <Col
            key={Math.random()}
            xs={6}
            md={6}
            onClick={this.openModal.bind(this, conditionalRender ? 1 : 0)}
            className={`border background ${beautify && 'beautify'}`}
            style={{
              background: `url(${conditionalRender ? images[1] : images[0]})`,
              height: '100%',
            }}
          >
            {this.renderOverlay()}
          </Col>
          <Col
            key={Math.random()}
            xs={6}
            md={6}
            onClick={this.openModal.bind(this, conditionalRender ? 2 : 1)}
            className={`border background ${beautify && 'beautify'}`}
            style={{
              background: `url(${conditionalRender ? images[2] : images[1]})`,
              height: '100%',
            }}
          >
            {overlay}
          </Col>
        </Row>
      </Grid>
    );
  }

  renderThree() {
    const { images, beautify, upperHeight } = this.props;
    const { countFrom } = this.state;
    const overlay =
      !countFrom ||
      countFrom > 5 ||
      (images.length > countFrom && [4, 5].includes(+countFrom))
        ? this.renderCountOverlay(true)
        : this.renderOverlay();
    const height = `${100 - upperHeight}%`;
    const conditionalRender =
      images.length === 4 || (images.length > +countFrom && +countFrom === 4);

    return (
      <Grid style={{ width: '100%', height }}>
        <Row style={{ width: '100%', height: '100%' }} key={Math.random()}>
          <Col
            key={Math.random()}
            xs={6}
            md={4}
            onClick={this.openModal.bind(this, conditionalRender ? 1 : 2)}
            className={`border background ${beautify && 'beautify'}`}
            style={{
              background: `url(${conditionalRender ? images[1] : images[2]})`,
              height: '100%',
            }}
          >
            {this.renderOverlay()}
          </Col>
          <Col
            key={Math.random()}
            xs={6}
            md={4}
            onClick={this.openModal.bind(this, conditionalRender ? 2 : 3)}
            className={`border background ${beautify && 'beautify'}`}
            style={{
              background: `url(${conditionalRender ? images[2] : images[3]})`,
              height: '100%',
            }}
          >
            {this.renderOverlay()}
          </Col>
          <Col
            key={Math.random()}
            xs={6}
            md={4}
            onClick={this.openModal.bind(this, conditionalRender ? 3 : 4)}
            className={`border background ${beautify && 'beautify'}`}
            style={{
              background: `url(${conditionalRender ? images[3] : images[4]})`,
              height: '100%',
            }}
          >
            {overlay}
          </Col>
        </Row>
      </Grid>
    );
  }

  renderOverlay() {
    const {
      hideOverlay,
      renderOverlay,
      overlayBackgroundColor,
      width,
      beautify,
    } = this.props;
    const fontSize = `${3 * (width / 100)}%`;

    if (hideOverlay) {
      return false;
    }

    return [
      <div
        key={Math.random()}
        className={`cover slide ${beautify && 'cover-beautify'}`}
        style={{ backgroundColor: overlayBackgroundColor }}
      />,
      <div
        key={Math.random()}
        className="cover-text slide animate-text"
        style={{ fontSize }}
      >
        {renderOverlay()}
      </div>,
    ];
  }

  renderCountOverlay(more) {
    const { images, width, beautify } = this.props;
    const { countFrom } = this.state;
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
    const fontSize = `${7 * (width / 100)}%`;

    return [
      more && (
        <div
          key={Math.random()}
          className={`cover ${beautify && 'cover-beautify'}`}
        />
      ),
      more && (
        <div key={Math.random()} className="cover-text" style={{ fontSize }}>
          <p>+{extra}</p>
        </div>
      ),
    ];
  }

  render() {
    const { modal, index, countFrom } = this.state;
    const { images, width } = this.props;
    const imagesToShow = [...images];

    if (countFrom && images.length > countFrom) {
      imagesToShow.length = countFrom;
    }

    return (
      <div
        className="react-fb-image-grid"
        style={{
          width: `${width}%`,
          height: `${width}%`,
        }}
      >
        {[1, 3, 4].includes(imagesToShow.length) && this.renderOne()}
        {imagesToShow.length >= 2 &&
          imagesToShow.length !== 4 &&
          this.renderTwo()}
        {imagesToShow.length >= 4 && this.renderThree()}

        {modal && (
          <Modal onClose={this.onClose} index={index} images={images} />
        )}
      </div>
    );
  }
}

Images.propTypes = {
  beautify: PropTypes.bool,
  countFrom: PropTypes.number,
  hideOverlay: PropTypes.bool,
  onClickEach: PropTypes.func,
  overlayBackgroundColor: PropTypes.string,
  renderOverlay: PropTypes.func,
  upperHeight: PropTypes.number,
  width: PropTypes.number,
};

export default Images;
