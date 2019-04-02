import React from "react";
import ReactApexChart from "react-apexcharts";

class DailyLineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sleepData: [
        { motion: 4.8209352900584545, timestamp: 1553665161 },
        { motion: 3.1971837262312556, timestamp: 1553665761 },
        { motion: 3.5040233644346386, timestamp: 1553666361 },
        { motion: 3.6783727121849839, timestamp: 1553666961 },
        { motion: 8.1440943626066108, timestamp: 1553667561 },
        { motion: 2.5747798234224293, timestamp: 1553668161 },
        { motion: 3.2866822468737746, timestamp: 1553668761 },
        { motion: 2.7048958236972472, timestamp: 1553669361 },
        { motion: 1.5174417376518263, timestamp: 1553669961 },
        { motion: 2.5681548232833543, timestamp: 1553670561 },
        { motion: 1.6186708800494678, timestamp: 1553671161 },
        { motion: 3.2903311905761548, timestamp: 1553671761 },
        { motion: 1.6270990418891122, timestamp: 1553672361 },
        { motion: 1.8558466233313068, timestamp: 1553672961 },
        { motion: 1.9191882677376253, timestamp: 1553673561 },
        { motion: 1.5518835050364332, timestamp: 1553674161 },
        { motion: 1.7805493200818712, timestamp: 1553674761 },
        { motion: 2.0621156928439932, timestamp: 1553675361 },
        { motion: 1.5473646352688479, timestamp: 1553675961 },
        { motion: 2.6905533738434288, timestamp: 1553676561 },
        { motion: 1.6631210351983694, timestamp: 1553677161 },
        { motion: 2.0448710451523448, timestamp: 1553677761 },
        { motion: 1.9186105762918796, timestamp: 1553678361 },
        { motion: 2.9101491579165032, timestamp: 1553678961 },
        { motion: 2.0843224726617332, timestamp: 1553679561 },
        { motion: 3.1402975929280128, timestamp: 1553680161 },
        { motion: 2.4249337057272592, timestamp: 1553680761 },
        { motion: 2.4333878042797251, timestamp: 1553681361 },
        { motion: 4.1488268394023207, timestamp: 1553681961 },
        { motion: 2.7872679295639244, timestamp: 1553682561 },
        { motion: 3.649584077050286, timestamp: 1553683161 },
        { motion: 5.347974315782394, timestamp: 1553683761 },
        { motion: 6.328985128800071, timestamp: 1553684361 },
        { motion: 8.3805624845127277, timestamp: 1553684961 },
        { motion: 8.1185336134086064, timestamp: 1553685561 },
        { motion: 7.4736218500882423, timestamp: 1553686161 },
        { motion: 6.7529103897511924, timestamp: 1553686761 },
        { motion: 5.6358410793046106, timestamp: 1553687361 },
        { motion: 5.8806757879753913, timestamp: 1553687961 },
        { motion: 5.65740215641757, timestamp: 1553688561 },
        { motion: 5.697561165566246, timestamp: 1553689161 }
      ],
      options: {
        chart: {
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },

        xaxis: {
          //   type: "datetime",
          categories: []
        }
        // tooltip: {
        //   x: {
        //     format: "dd/MM/yy HH:mm"
        //   }
        // }
      },
      series: [
        {
          name: "series1",
          data: []
        }
      ]
    };
  }

  componentDidMount() {
    let options = this.state.options;
    let series = this.state.series;
    options.xaxis.categories = this.state.sleepData.map(data => {
      return data.timestamp;
    });
    series[0].data = this.state.sleepData.map(data => {
      return data.motion;
    });
    this.setState({ options, series });
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height="350"
        />
      </div>
    );
  }
}

export default DailyLineGraph;
