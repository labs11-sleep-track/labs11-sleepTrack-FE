import React from "react";
import { connect } from "react-redux";

import RadialChart from "../components/Dashboard/RadialChart";
import { fetchUserDailyData } from "../actions/index";
import styled from "styled-components";

const RadialCharts = styled.div`
  display: flex;
`;

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("mounting");
    //hardcoding in a user for now, but will later get the user_id after logging in
    const user_id = 1;
    this.props.fetchUserDailyData(user_id);
    console.log("user data after mounting ", this.props.userDailyData);
  }

  render() {
    console.log("daily data while rendering", this.props.userDailyData);
    return (
      <RadialCharts>
        {this.props.userDailyData.map(dailyData => {
          return <RadialChart dailyData={dailyData} />;
        })}
      </RadialCharts>
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
