import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import _ from "lodash";
import http from "../../../services/httpService";
import apiEndPoints from "../../../config/apiEndPoints";
import NotFound from "../../common/NotFound";

class CertificationExpiry extends Component {
  constructor(props) {
    super(props);
    this.totalMonths = 6;
    this.state = {
      isLoading: true,
      expiringCertificationData: [],
      data: [],
    };
    this.months = [];
  }

  updateMonths = () => {
    let currDate = new Date();
    this.months = [];
    for (let i = 0; i < this.totalMonths; i++) {
      this.months.push(
        currDate.toLocaleString("default", { month: "short", year: "2-digit" })
      );
      currDate.setMonth(currDate.getMonth() + 1);
    }
  };

  fetchCertificationExpiryData = async () => {
    let endpoint = new URL(apiEndPoints.metricsCertificationExpiryResource());
    endpoint.searchParams.append("months_until", this.totalMonths);
    const response = await http.get(endpoint.toString());

    if (response.status === 200) {
      this.updateMonths();
      this.setState({
        data: this.months.map((month, index) => ({
          month: month,
          expiring: response.data[index],
        })),
      });
      console.log("got certification expirty data");
    }
    this.setState({ isLoading: false });
  };

  componentDidMount() {
    this.fetchCertificationExpiryData();
  }

  handleMonthsChange = (e) => {
    this.totalMonths = e.target.value;
    this.fetchCertificationExpiryData();
  };

  renderMonthsDropDown = () => {
    return (
      <div className="form-inline">
        <div className="form-group ">
          <label htmlFor="certificateExpiryDropDown" className="mr-2">
            Months Until
          </label>
          <select
            className="form-control"
            id="certificateExpiryDropDown"
            onChange={(e, data) => {
              this.handleMonthsChange(e);
            }}
            defaultValue={this.totalMonths}
          >
            {_.range(1, 13).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  certificationExpiryDataEmpty = () => {
    const { data: certificationExpiryData } = this.state;
    if (certificationExpiryData.length === 0) return true;
    let isEmpty = true;
    certificationExpiryData.forEach((certificationExpiry) => {
      if (certificationExpiry.expiring > 0) isEmpty = false;
    });
    return isEmpty;
  };

  render() {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <h3>Expiring Certifications</h3>
        <div style={{ width: "40%" }}>{this.renderMonthsDropDown()}</div>
        <div style={{ height: "300px", width: "700px" }}>
          {!this.certificationExpiryDataEmpty() ? (
            <ResponsiveBar
              data={this.state.data}
              keys={["expiring"]}
              indexBy="month"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "pastel1" }}
              // defs={[
              //   {
              //     id: "dots",
              //     type: "patternDots",
              //     background: "inherit",
              //     color: "#38bcb2",
              //     size: 4,
              //     padding: 1,
              //     stagger: true,
              //   },
              //   {
              //     id: "lines",
              //     type: "patternLines",
              //     background: "inherit",
              //     color: "#eed312",
              //     rotation: -45,
              //     lineWidth: 6,
              //     spacing: 10,
              //   },
              // ]}
              // fill={[
              //   {
              //     match: {
              //       id: "fries",
              //     },
              //     id: "dots",
              //   },
              //   {
              //     match: {
              //       id: "sandwich",
              //     },
              //     id: "lines",
              //   },
              // ]}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "months",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "# expiring",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[]}
              // legends={[
              //   {
              //     dataFrom: "keys",
              //     anchor: "bottom-right",
              //     direction: "column",
              //     justify: false,
              //     translateX: 120,
              //     translateY: 0,
              //     itemsSpacing: 2,
              //     itemWidth: 100,
              //     itemHeight: 20,
              //     itemDirection: "left-to-right",
              //     itemOpacity: 0.85,
              //     symbolSize: 20,
              //     effects: [
              //       {
              //         on: "hover",
              //         style: {
              //           itemOpacity: 1,
              //         },
              //       },
              //     ],
              //   },
              // ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          ) : (
            <NotFound />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default CertificationExpiry;
