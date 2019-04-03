import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import { fetchUserDailyData } from "../actions/index";
import RadialChart from "../components/Dashboard/RadialChart";
import DailyLineGraph from "../components/Dashboard/DailyLineGraph";
import WeeklyLineGraph from "../components/Dashboard/WeeklyLineGraph";
import LoggedInSideNav from "../components/Nav/LoggedInSideNav.js";

const RadialCharts = styled.div`
  display: flex;
`;

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sleepData: [],
      dailyDisplayed: false,
      week: moment().format("YYYY-[W]WW"),
      firstWeekDay: null,
      lastWeekDay: null,
      filteredDailyData: Array(7).fill(0)
    };
  }

  componentDidMount() {
    //hardcoding in a user for now, but will later get the user_id after logging in
    const user_id = 1;
    this.props.fetchUserDailyData(user_id);

    const time = moment(this.state.week)._d;
    const first = parseInt(moment(time).format("X"));
    const last = parseInt(moment(time).format("X")) + 604800;
    this.setState({
      firstWeekDay: first,
      lastWeekDay: last
    });
  }

  componentDidUpdate(prevProps, prevState) {
    //set firstWeekDay and lastWeekDay to unix times based on what week user has inputted:
    if (prevProps.userDailyData.length !== this.props.userDailyData.length) {
      const time = moment(this.state.week)._d;
      const first = parseInt(moment(time).format("X"));
      const last = parseInt(moment(time).format("X")) + 604800;
      this.setState(
        {
          firstWeekDay: first,
          lastWeekDay: last
        },
        () => {
          const filtered = this.props.userDailyData.filter(dailyData => {
            return (
              this.state.firstWeekDay <= dailyData.sleeptime &&
              dailyData.sleeptime <= this.state.lastWeekDay
            );
          });
          let newFiltered = Array(7).fill(0);
          for (let i = 0; i < filtered.length; i++) {
            newFiltered[i] = filtered[i];
          }
          this.setState({ filteredDailyData: newFiltered });
        }
      );
    }

    if (prevState.week !== this.state.week) {
      const time = moment(this.state.week)._d;
      const first = parseInt(moment(time).format("X"));
      const last = parseInt(moment(time).format("X")) + 604800;
      this.setState(
        {
          firstWeekDay: first,
          lastWeekDay: last
        },
        () => {
          // sets filteredDailyData to dates only within selected days of the week
          const filtered = this.props.userDailyData.filter(dailyData => {
            return (
              this.state.firstWeekDay <= dailyData.sleeptime &&
              dailyData.sleeptime <= this.state.lastWeekDay
            );
          });
          let newFiltered = Array(7).fill(0);
          for (let i = 0; i < filtered.length; i++) {
            newFiltered[i] = filtered[i];
          }
          this.setState({ filteredDailyData: newFiltered });
        }
      );
    }
  }
  //used when clicking on daily radial chart to display line graph of sleep movement from that day
  showDailyGraph = (e, data) => {
    e.preventDefault();
    console.log("show daily graph");
    this.setState({
      dailyDisplayed: true,
      sleepData: data
    });
  };
  //used when clicking on "show weekly data" button to display weekly data again
  showWeeklyGraph = e => {
    e.preventDefault();
    this.setState({ dailyDisplayed: false, sleepData: [] });
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log("rendering dashboard");
    return (
      <div>
        <div>
          <LoggedInSideNav />
        </div>
        <input
          type="week"
          name="week"
          value={this.state.week}
          onChange={this.handleInputChange}
        />
        {this.state.dailyDisplayed ? (
          <DailyLineGraph sleepData={this.state.sleepData} />
        ) : (
          <WeeklyLineGraph />
        )}
        {this.state.dailyDisplayed && (
          <button onClick={this.showWeeklyGraph}>View Weekly Data</button>
        )}
        <RadialCharts>
          {this.state.filteredDailyData.map(dailyData => {
            return (
              <RadialChart
                key={dailyData.id}
                dailyData={dailyData}
                showDailyGraph={this.showDailyGraph}
              />
            );
          })}
        </RadialCharts>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDailyData: state.compReducer.userDailyData
});

export default connect(
  mapStateToProps,
  { fetchUserDailyData }
)(DashboardView);
