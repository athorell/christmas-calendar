var React = require('react');
var _ = require('lodash');

var CalendarFooter = require('./CalendarFooter');
var CalendarHeader = require('./CalendarHeader');
var GifWindow = require('./GifWindow');

var CALENDAR_WINDOWS = [
  { number: 1, gif: "cat.gif" },
  { number: 2, gif: "cat.gif" },
  { number: 3, gif: "cat.gif" },
  { number: 4, gif: "cat.gif" },
  { number: 5, gif: "cat.gif" },
  { number: 6, gif: "cat.gif" },
  { number: 7, gif: "cat.gif" },
  { number: 8, gif: "cat.gif" },
  { number: 9, gif: "cat.gif" },
  { number: 10, gif: "cat.gif" },
  { number: 11, gif: "cat.gif" },
  { number: 12, gif: "cat.gif" },
  { number: 13, gif: "cat.gif" },
  { number: 14, gif: "cat.gif" },
  { number: 15, gif: "cat.gif" },
  { number: 16, gif: "cat.gif" },
  { number: 17, gif: "cat.gif" },
  { number: 18, gif: "cat.gif" },
  { number: 19, gif: "cat.gif" },
  { number: 20, gif: "cat.gif" },
  { number: 21, gif: "cat.gif" },
  { number: 22, gif: "cat.gif" },
  { number: 23, gif: "cat.gif" },
  { number: 24, gif: "cat.gif" },
];

var Calendar = React.createClass({
  displayName: 'Calendar',
  
  getInitialState: function() {
    var width = document.documentElement.clientWidth;
    if(!localStorage.getItem('windows')) {
      var _windows = _.shuffle(CALENDAR_WINDOWS);
      localStorage.setItem('windows', JSON.stringify(_windows));
    }
    var calendarWindows = {calendarWindows: JSON.parse(localStorage.getItem('windows')) || null};
    return Object.assign({}, calendarWindows, this.calculateSize());
  },
  
  componentDidMount: function() {
    window.onresize = _.debounce(this.onResize, 300);
  },
  
  getStyles: function() {
    var styles = {
      windows: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      windowsDesktop: {
        padding: '0px 50px 50px 50px',
      },
      windowsTablet: {
        padding: '0px 30px 30px 30px',
      },
      windowsMobile: {
        padding: '0px 10px 10px 10px',
      }
    };

    var currentStyle;
    if(this.state.desktop) {
      currentStyle = styles.windowsDesktop;
    } else if(this.state.tablet) {
      currentStyle = styles.windowsTablet;
    } else if(this.state.mobile) {
      currentStyle = styles.windowsMobile;
    }
    return Object.assign({}, styles.windows, currentStyle);
  },
  
  onResize: function() {
    this.setState(this.calculateSize());
  },
  
  calculateSize: function() {
    var width = document.documentElement.clientWidth;
    return {
      desktop: width >= 800,
      tablet: width < 800 && width >= 628,
      mobile: width < 628,
    };
  },
  
  renderWindows: function() {
    var state = this.state;
    return _.map(state.calendarWindows, function(window) {
      return (
        <GifWindow
          key={window.number}
          number={window.number}
          gif={window.gif}
          desktop={state.desktop}
          tablet={state.tablet}
          mobile={state.mobile}
        />
      );
    });
  },
  
  render: function() {
    var state = this.state;
    var styles = this.getStyles();
    return (
      <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
        <CalendarHeader
          text="Merry Christmas!"
          desktop={state.desktop}
          tablet={state.tablet}
          mobile={state.mobile}
        />
        <div style={styles}>
          {this.renderWindows()}
        </div>
        <CalendarFooter
          desktop={state.desktop}
          tablet={state.tablet}
          mobile={state.mobile}
        />
      </div>
    )
  }
});

module.exports = Calendar;