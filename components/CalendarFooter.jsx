var React = require('react');

var CalendarFooter = React.createClass({
  displayName: 'CalendarFooter',
  
  propTypes: {
    media: React.PropTypes.string,
  },
  
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
        padding: '30px 0px',
        fontFamily: 'Helvetica',
        fontWeight: '200',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(214,69,65,1)',
        link: {
          textDecoration: 'none',
          color: 'white',
        },
        hover: {
          textDecoration: 'underline',
          cursor: 'pointer',
        }
      },
      desktop: {
        height: '100px',
        fontSize: '20px',
        marginTop: '50px',
      },
      tablet: {
        height: '80px',
        fontSize: '18px',
        marginTop: '40px',
      },
      mobile: {
        height: '60px',
        fontSize: '15px',
        marginTop: '30px',
      }
    };
    var currentStyle = styles.footer;
    return this.applyMediaStyle(currentStyle, styles);
  },
  
  applyMediaStyle: function(currentStyle, styles) {
    var media = this.props.media;
    var style = Object.assign({}, currentStyle, styles[media]);
    return style;
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
          onMouseOut={this.hoverLink}
          style={styles.link}
          href="https://github.com/athorell/christmas-calendar">
          Make your own Christmas Calendar
        </a>
      </div>
    )
  }
});

module.exports = CalendarFooter;