var React = require('react');

var CalendarFooter = React.createClass({
  displayName: 'CalendarFooter',
  
  getInitialState: function() {
    return {
      hover: false,
    };
  },
  
  getStyles: function() {
    var styles = {
      footer: {
        display: 'flex',
        flex: '1',
        height: '100px',
        padding: '30px 0px',
        fontFamily: 'Helvetica',
        fontWeight: '200',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(214,69,65,1)',
        color: 'white',
        hover: {
          textDecoration: 'underline',
          cursor: 'pointer',
        }
      },
      footerDesktop: {
        fontSize: '20px',
      },
      footerTablet: {
        fontSize: '18px',
      },
      footerMobile: {
        fontSize: '15px',
      }
    };
    
    var currentStyle;
    if(this.props.desktop) {
      currentStyle = styles.footerDesktop;
    } else if(this.props.tablet) {
      currentStyle = styles.footerTablet;
    } else if(this.props.mobile) {
      currentStyle = styles.footerMobile;
    }
    return Object.assign({}, styles.footer, currentStyle);
  },
  
  hoverLink: function() {
    var state = this.state.hover;
    this.setState({
      hover: !state,
    });
  },
  
  render: function() {
    var styles = this.getStyles();
    if(this.state.hover) {
      styles = Object.assign({}, styles, styles.hover);
    }
    return (
      <div style={styles}>
        <a
          onMouseOver={this.hoverLink}
          onMouseOut={this.hoverLink}>
          Make your own Christmas Calendar
        </a>
      </div>
    )
  }
});

module.exports = CalendarFooter;