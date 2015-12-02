var React = require('react');

var CalendarHeader = React.createClass({
  displayName: 'CalendarHeader',
  
  propTypes: {
    text: React.PropTypes.string,
    media: React.PropTypes.string,
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
      desktop: {
        fontSize: '50px',
      },
      tablet: {
        fontSize: '40px',
      },
      mobile: {
        fontSize: '30px',
      }
    };
    var currentStyle = styles.header;
    return this.applyMediaStyle(currentStyle, styles);
  },
  
  applyMediaStyle: function(currentStyle, styles) {
    var media = this.props.media;
    var style = Object.assign({}, currentStyle, styles[media]);
    return style;
  },
  
  render: function() {
    var styles = this.getStyles();
    return (
      <h1 style={styles}>{this.props.text}</h1>
    )
  }
});

module.exports = CalendarHeader;