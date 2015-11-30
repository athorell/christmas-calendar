var React = require('react');
var Moment = require('moment');

var GifWindow = React.createClass({
  displayName: 'GifWindow',
  
  propTypes: {
    number: React.PropTypes.number,
    gif: React.PropTypes.string,
    desktop: React.PropTypes.bool,
    tablet: React.PropTypes.bool,
    mobile: React.PropTypes.bool,
  },
  
  getInitialState: function() {
    var number = this.props.number;
    if(!localStorage.getItem(number)) {
      localStorage.setItem(number, JSON.stringify(false));
    }
    return {
      open: JSON.parse(localStorage.getItem(number)) || null,
      available: this.props.number <= Moment().date() && Moment().month() === 12,
    };
  },
  
  getStyles: function() {
    var styles = {
      window: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
        cursor: 'pointer',
        backgroundColor: 'rgba(30,130,76,1)',
        borderRadius: '2px',
        color: 'white',
        fontFamily: 'Helvetica',
        fontSize: '40px',
      },
      open: {
        backgroundColor: 'rgba(253,227,167,1)',
        img: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      },
      disabled: {
        backgroundColor: 'rgba(214,69,65,1)',
        cursor: 'default',
      },
      windowDesktop: {
        width: '200px',
        height: '200px',
        open: {
          img: {
            maxHeight: '180px',
            maxWidth: '180px',
          }
        }
      },
      windowTablet: {
        width: '150px',
        height: '150px',
        open: {
          img: {
            maxWidth: '140px',
            maxHeight: '140px',
          }
        }
      },
      windowMobile: {
        width: '100px',
        height: '100px',
        open: {
          img: {
            maxWidth: '90px',
            maxHeight: '90px',
          }
        }
      }
    };
    var currentStyle;
    if(!this.state.open && !this.state.available) {
      // Window is closed and disabled
      currentStyle = Object.assign({}, styles.window, styles.disabled);
    } else if(!this.state.open && this.state.available) {
      // Window is closed and available
      currentStyle = styles.window;
    } else if(this.state.open) {
      // Window is open
      currentStyle = Object.assign({}, styles.window, styles.open);
    }
    return this.applyMediaStyle(styles, currentStyle);
  },
  
  applyMediaStyle: function(styles, appendStyle) {
    var mediaStyle;
    if(this.props.desktop) {
      mediaStyle = Object.assign({}, appendStyle, styles.windowDesktop);
    } else if(this.props.tablet) {
      mediaStyle = Object.assign({}, appendStyle, styles.windowTablet);
    } else if(this.props.mobile) {
      mediaStyle = Object.assign({}, appendStyle, styles.windowMobile);
    }
    if(this.state.open) {
      if(this.props.desktop) {
        mediaStyle = Object.assign({}, mediaStyle, styles.windowDesktop.open);
      } else if(this.props.tablet) {
        mediaStyle = Object.assign({}, mediaStyle, styles.windowTablet.open);
      } else if(this.props.mobile) {
        mediaStyle = Object.assign({}, mediaStyle, styles.windowMobile.open);
      }
    }
    return mediaStyle;
  },
  
  openWindow: function() {
    this.setState({
      open: true,
    }, function() {
      localStorage.setItem(this.props.number, JSON.stringify(true));
    });
  },
  
  render: function() {
    var styles = this.getStyles();
    if(!this.state.open && !this.state.available) {
      // Window is closed and disabled
      return (
        <div style={styles}>
          <p>{this.props.number}</p>
        </div>
      );
    } else if(!this.state.open && this.state.available) {
      // Window is closed and available
      return (
        <div style={styles} onClick={this.openWindow}>
          <p>{this.props.number}</p>
        </div>
      );
    } else if(this.state.open) {
      // Window is open
      return (
        <div style={styles}>
          <img style={styles.img} src={"../assets/images/" + this.props.gif}></img>
        </div>
      );
    }
  }
});

module.exports = GifWindow;