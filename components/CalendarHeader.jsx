var React = require('react');

var CalendarHeader = React.createClass({
  displayName: 'CalendarHeader',
  
  propTypes: {
    text: React.PropTypes.string,
    desktop: React.PropTypes.bool,
    tablet: React.PropTypes.bool,
    mobile: React.PropTypes.bool,
  },
  
  getStyles: function() {
    var styles = {
      header: {
        display: 'flex',
        height: '100px',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Helvetica',
        textAlign: 'center',
        color: 'rgba(214,69,65,1)',
      },
      headerDesktop: {
        fontSize: '50px',
      },
      headerTablet: {
        fontSize: '40px',
      },
      headerMobile: {
        fontSize: '30px',
      }
    };
    
    var currentStyle;
    if(this.props.desktop) {
      currentStyle = styles.headerDesktop;
    } else if(this.props.tablet) {
      currentStyle = styles.headerTablet;
    } else if(this.props.mobile) {
      currentStyle = styles.headerMobile;
    }
    return Object.assign({}, styles.header, currentStyle);
  },
  
  render: function() {
    var styles = this.getStyles();
    return (
      <h1 style={styles}>{this.props.text}</h1>
    )
  }
});

module.exports = CalendarHeader;